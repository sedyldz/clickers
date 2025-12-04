interface MouseRecord {
  x: number
  y: number
  timestamp: number
}

interface EventRecord {
  type: string
  target: string | EventTarget // Simplistic target identifier
  timestamp: number
  isPrecedingEvent: boolean // For mousedown/mouseup before click
}

export interface FeatureSet {
  // Advanced Movement Analysis (High-Value)
  speedVariance: number
  timeDeltaVariance: number
  pathCurvature: number

  // Timing and Rate Analysis (Medium-Value)
  timeToFirstInteraction: number // TTFI
  keyInterEventVariance: number
  clickDurationVariance: number

  // Event/Property Inspection (Boolean/Ratio)
  hasClickWithoutPrecedingEvents: number // 0 or 1
  screenAspectRatioDeviation: number // Deviation from standard aspect ratio (e.g., 16:9)
  totalMoveEvents: number
  tabKeyUsage: number

  // Simplistic Checks (Low-Value)
  fixedPositionCount: number // Number of fixed/zero-movement segments
}

export interface SuspicionResult {
  score: number
  isBot: boolean
  features: FeatureSet
}

enum ListenedEvents {
  MOUSE_MOVE = 'mousemove',
  MOUSE_DOWN = 'mousedown',
  MOUSE_UP = 'mouseup',
  MOUSE_CLICK = 'click',
  KEYBOARD_KEY = 'keydown',
}

// --- The BotDetector Class ---

export class BotDetector {
  // --- Configuration (Weights and Threshold) ---
  // These weights determine the contribution of each feature to the total Suspicion Score.
  private WEIGHTS: Record<keyof FeatureSet, number> = {
    // High-Value Weights
    speedVariance: 0.3, // Low variance suggests bot (we flip the score below)
    timeDeltaVariance: 0.3, // Low variance suggests bot (we flip the score below)
    pathCurvature: 0.25, // Low curvature suggests bot (we flip the score below)

    // Medium-Value Weights
    timeToFirstInteraction: 0.05, // Very low TTFI suggests bot
    keyInterEventVariance: 0.04, // Low variance suggests bot (we flip the score below)
    clickDurationVariance: 0.03, // Low variance suggests bot (we flip the score below)

    // Event/Property Weights
    hasClickWithoutPrecedingEvents: 0.8, // Major red flag
    screenAspectRatioDeviation: 0.02, // Non-standard screen/viewport
    totalMoveEvents: 0.01, // Too few or too many events
    tabKeyUsage: -0.2, // High negative weight since it's a strong human indicator
    // Low-Value Weights
    fixedPositionCount: 0.01,
  }

  // Threshold (adjust this based on testing)
  private BOT_THRESHOLD = 0.5

  // --- Data Storage ---
  private mouseRecords: MouseRecord[] = []
  private eventRecords: EventRecord[] = []
  private keyPressRecords: number[] = [] // Timestamps of keydowns
  private clickDurations: number[] = [] // Duration (mouseup.ts - mousedown.ts)
  private mousedownTimestamp: number | null = null
  private pageLoadTime: number = performance.now()
  private tracking = false
  private tabPressCount = 0

  // --- Initialization ---
  constructor() {
    this._handleMouseMove = this._handleMouseMove.bind(this)
    this._handleKeyDown = this._handleKeyDown.bind(this)
    this._handleMouseDown = this._handleMouseDown.bind(this)
    this._handleMouseUp = this._handleMouseUp.bind(this)
    this._handleClick = this._handleClick.bind(this)
  }

  public startTracking(): void {
    if (this.tracking) return

    document.addEventListener(ListenedEvents.MOUSE_MOVE, this._handleMouseMove)
    document.addEventListener(ListenedEvents.KEYBOARD_KEY, this._handleKeyDown)
    document.addEventListener(ListenedEvents.MOUSE_DOWN, this._handleMouseDown)
    document.addEventListener(ListenedEvents.MOUSE_UP, this._handleMouseUp)
    document.addEventListener(ListenedEvents.MOUSE_CLICK, this._handleClick)
    this.tracking = true
    console.log('Mouse Bot detection tracking started.')
  }

  public stopTracking(): SuspicionResult {
    if (!this.tracking) {
      throw new Error('Mouse bot detection not started!')
    }

    document.removeEventListener(ListenedEvents.MOUSE_MOVE, this._handleMouseMove)
    document.removeEventListener(ListenedEvents.KEYBOARD_KEY, this._handleKeyDown)
    document.removeEventListener(ListenedEvents.MOUSE_DOWN, this._handleMouseDown)
    document.removeEventListener(ListenedEvents.MOUSE_UP, this._handleMouseUp)
    document.removeEventListener(ListenedEvents.MOUSE_CLICK, this._handleClick)
    this.tracking = false

    const features = this._calculateFeatures()
    const score = this._calculateSuspicionScore(features)

    return {
      score,
      isBot: score > this.BOT_THRESHOLD,
      features,
    }
  }

  private _handleMouseMove(event: MouseEvent): void {
    const timestamp = performance.now()
    this.mouseRecords.push({
      x: event.clientX,
      y: event.clientY,
      timestamp,
    })

    if (this.eventRecords.length === 0) {
      // Record TTFI (Time to First Interaction) for mouse movement
      this.eventRecords.push({
        type: ListenedEvents.MOUSE_MOVE,
        target: event.target ?? 'document',
        timestamp,
        isPrecedingEvent: false,
      })
    }
  }

  private _handleKeyDown(event: KeyboardEvent): void {
    const timestamp = performance.now()
    this.keyPressRecords.push(timestamp)

    if (event.key === 'Tab' || event.code === 'Tab') {
      this.tabPressCount++
    }

    if (this.eventRecords.length === 0) {
      // Record TTFI (Time to First Interaction) for keyboard
      this.eventRecords.push({
        type: ListenedEvents.MOUSE_DOWN,
        target: event.target ?? 'document',
        timestamp,
        isPrecedingEvent: false,
      })
    }
  }

  private _handleMouseDown(event: MouseEvent): void {
    this.mousedownTimestamp = performance.now()
    this.eventRecords.push({
      type: ListenedEvents.MOUSE_DOWN,
      target: event.target ?? 'document',
      timestamp: this.mousedownTimestamp,
      isPrecedingEvent: true,
    })
  }

  private _handleMouseUp(event: MouseEvent): void {
    const mouseupTimestamp = performance.now()
    this.eventRecords.push({
      type: ListenedEvents.MOUSE_UP,
      target: event.target ?? 'document',
      timestamp: mouseupTimestamp,
      isPrecedingEvent: true,
    })

    if (this.mousedownTimestamp !== null) {
      this.clickDurations.push(mouseupTimestamp - this.mousedownTimestamp)
      this.mousedownTimestamp = null // Reset for next click
    }
  }

  private _handleClick(event: MouseEvent): void {
    this.eventRecords.push({
      type: ListenedEvents.MOUSE_CLICK,
      target: event.target ?? 'document',
      timestamp: performance.now(),
      isPrecedingEvent: false,
    })
  }

  // --- Feature Calculation (The Core Logic) ---

  private _calculateFeatures(): FeatureSet {
    // Use a dummy object for features; we'll populate it below
    const features = {} as FeatureSet

    // --- High-Value Movement Analysis ---
    let totalDistance = 0
    let fixedPositionCount = 0
    const speeds: number[] = []
    const timeDeltas: number[] = []
    const angles: number[] = []

    if (this.mouseRecords.length >= 2) {
      for (let i = 1; i < this.mouseRecords.length; i++) {
        const previous = this.mouseRecords[i - 1]
        const current = this.mouseRecords[i]

        const deltaX = current.x - previous.x
        const deltaY = current.y - previous.y
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)

        if (distance === 0) {
          fixedPositionCount++
        }

        totalDistance += distance

        const timeDelta = current.timestamp - previous.timestamp
        timeDeltas.push(timeDelta)

        if (timeDelta > 0 && distance > 0) {
          speeds.push(distance / timeDelta)

          // Calculate Angle for Path Curvature (Jitter)
          // We check for angle change between 3 points
          if (i >= 2) {
            const prevPrev = this.mouseRecords[i - 2]
            const angle1 = Math.atan2(previous.y - prevPrev.y, previous.x - prevPrev.x)
            const angle2 = Math.atan2(current.y - previous.y, current.x - previous.x)
            // Angle change is the curvature
            let angleChange = Math.abs(angle2 - angle1)
            // Normalize angle to be between 0 and PI
            if (angleChange > Math.PI) angleChange = 2 * Math.PI - angleChange
            angles.push(angleChange)
          }
        }
      }
    }

    const avgSpeed = this._calculateMean(speeds)
    const avgTimeDelta = this._calculateMean(timeDeltas)
    const avgAngle = this._calculateMean(angles)

    // Movement Features
    features.speedVariance = this._calculateVariance(speeds, avgSpeed)
    features.timeDeltaVariance = this._calculateVariance(timeDeltas, avgTimeDelta)
    features.pathCurvature = this._calculateVariance(angles, avgAngle) // Variance of angles (Jitter)
    features.fixedPositionCount = fixedPositionCount
    features.totalMoveEvents = this.mouseRecords.length

    // --- Medium-Value Timing Analysis ---

    // TTFI (Time to First Interaction)
    const firstInteraction = (this.eventRecords[0] || this.mouseRecords[0]) as
      | EventRecord
      | MouseRecord
      | undefined
    features.timeToFirstInteraction = firstInteraction
      ? firstInteraction.timestamp - this.pageLoadTime
      : 10000 // Use a high value if no interaction recorded

    // Keystroke Timing Variance
    const keyInterEvents: number[] = []
    for (let i = 1; i < this.keyPressRecords.length; i++) {
      keyInterEvents.push(this.keyPressRecords[i] - this.keyPressRecords[i - 1])
    }
    features.keyInterEventVariance = this._calculateVariance(
      keyInterEvents,
      this._calculateMean(keyInterEvents),
    )

    // Click Duration Variance
    features.clickDurationVariance = this._calculateVariance(
      this.clickDurations,
      this._calculateMean(this.clickDurations),
    )

    // --- Event and Property Inspection ---

    // Missing Events Check (Simplistic: Did any click occur without a preceding mousedown/mouseup?)
    let clickCount = 0
    let eventPairCount = 0
    for (let i = 0; i < this.eventRecords.length; i++) {
      if (this.eventRecords[i].type === 'click') {
        clickCount++
        // Look back to see if mousedown/mouseup occurred right before
        const isPaired = this.eventRecords
          .slice(Math.max(0, i - 2), i)
          .some((e) => e.isPrecedingEvent)
        if (isPaired) {
          eventPairCount++
        }
      }
    }
    // Flag is set if the majority of clicks are missing pairs
    features.hasClickWithoutPrecedingEvents =
      clickCount > 0 && eventPairCount < clickCount * 0.5 ? 1 : 0
    features.tabKeyUsage =
      this.keyPressRecords.length > 0 ? this.tabPressCount / this.keyPressRecords.length : 0
    // Screen/Viewport Aspect Ratio Check
    const aspectRatio = window.innerWidth / window.innerHeight
    // Standard aspect ratios: 16/9 ≈ 1.77, 4/3 ≈ 1.33. We check deviation from 16:9.
    features.screenAspectRatioDeviation = Math.abs(aspectRatio - 16 / 9)

    return features
  }

  // --- Scoring and Weighting ---

  private _calculateSuspicionScore(features: FeatureSet): number {
    let score = 0
    const weights = this.WEIGHTS

    // Note: For Variance features, a LOW value means a BOT, so we use the inverse (1 - normalized_variance)

    // High-Value: Inverse Variance (Low variance = High Score)
    score += weights.speedVariance * (1 - this._normalizeVariance(features.speedVariance, 0, 100))
    score +=
      weights.timeDeltaVariance * (1 - this._normalizeVariance(features.timeDeltaVariance, 0, 10)) // Time delta typically smaller
    score +=
      weights.pathCurvature * (1 - this._normalizeVariance(features.pathCurvature, 0, 1)) // Angles are small

    // Medium-Value: Inverse Variance and TTFI
    // TTFI: Lower TTFI (e.g., < 100ms) is suspicious. We use inverse TTFI.
    // We normalize TTFI to be high when it's low (suspicious)
    const normalizedTTFI = 1 - this._normalizeValue(features.timeToFirstInteraction, 0, 5000) // Max human reaction ~ 5s
    score += weights.timeToFirstInteraction * Math.max(0, normalizedTTFI)

    score +=
      weights.keyInterEventVariance *
      (1 - this._normalizeVariance(features.keyInterEventVariance, 0, 100))
    score +=
      weights.clickDurationVariance *
      (1 - this._normalizeVariance(features.clickDurationVariance, 0, 100))

    // Event/Property: Direct scoring
    score += weights.hasClickWithoutPrecedingEvents * features.hasClickWithoutPrecedingEvents
    score +=
      weights.screenAspectRatioDeviation *
      this._normalizeValue(features.screenAspectRatioDeviation, 0, 1)

    // Low-Value: Fixed Position and Total Events (simplified scoring)
    score +=
      weights.fixedPositionCount *
      this._normalizeValue(features.fixedPositionCount, 0, features.totalMoveEvents || 1)

    // --- Tab Key Usage Scoring (Negative Contribution) ---
    // High tab key usage means LOW suspicion, so we subtract its normalized value.
    const normalizedTabUsage = this._normalizeValue(features.tabKeyUsage, 0, 0.5) // Max reasonable usage for forms is maybe 50%
    score += weights.tabKeyUsage * normalizedTabUsage // Since weight is negative, this effectively subtracts from the score.

    return Math.max(0, score)
  }

  // --- Utility Functions ---

  private _calculateMean(arr: number[]): number {
    if (arr.length === 0) return 0
    return arr.reduce((a, b) => a + b, 0) / arr.length
  }

  private _calculateVariance(arr: number[], mean: number): number {
    if (arr.length < 2) return 0
    const squaredDifferences = arr.map((n) => Math.pow(n - mean, 2))
    return squaredDifferences.reduce((a, b) => a + b, 0) / arr.length
  }

  /** Normalizes a value between a min/max range to be between 0 and 1. */
  private _normalizeValue(value: number, min: number, max: number): number {
    if (max === min) return 0
    const normalized = (value - min) / (max - min)
    return Math.min(1, Math.max(0, normalized))
  }

  /** Normalizes variance, where 0 variance is the most suspicious. */
  private _normalizeVariance(variance: number, minVariance: number, maxVariance: number): number {
    // We assume low variance is most suspicious. We want high score when variance is low.
    // So we normalize the variance itself to get a sense of its magnitude.
    const normalized = this._normalizeValue(variance, minVariance, maxVariance)
    return normalized
  }
}


