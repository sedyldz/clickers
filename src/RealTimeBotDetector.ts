interface MouseRecord {
    x: number;
    y: number;
    timestamp: number;
}

interface EventRecord {
    type: string;
    target: string | EventTarget;
    timestamp: number;
    isPrecedingEvent: boolean;
}

interface FeatureSet {
    // Variance metrics (Low variance = Bot)
    speedVariance: number;
    timeDeltaVariance: number;
    pathCurvature: number; 
    keyInterEventVariance: number;
    clickDurationVariance: number;

    // Timing metrics
    timeToFirstInteraction: number; 

    // Flags / Ratios
    hasClickWithoutPrecedingEvents: number; // 0 or 1
    totalMoveEvents: number;
    tabKeyUsage: number; // 0 to 1
    fixedPositionCount: number;
}

export interface SuspicionResult {
    timestamp: number; 
    score: number;
    isBot: boolean;
    features: FeatureSet;
}

enum ListenedEvents {
    MOUSE_MOVE = 'mousemove',
    MOUSE_DOWN = 'mousedown',
    MOUSE_UP = 'mouseup',
    MOUSE_CLICK = 'click',
    KEYBOARD_KEY = 'keydown'
}

export class RealTimeBotDetector {
    // 1. REAL-TIME WEIGHTS (Aggressive)
    // Used for the live graph and finding the "Peak" suspicion.
    // We strictly penalize bot-like behavior here.
    private REALTIME_WEIGHTS: Record<keyof FeatureSet, number> = {
        speedVariance: 0.3,         
        timeDeltaVariance: 0.3,     
        pathCurvature: 0.25,        
        hasClickWithoutPrecedingEvents: 0.8, 
        timeToFirstInteraction: 0.05,
        keyInterEventVariance: 0.04,
        clickDurationVariance: 0.03,
        fixedPositionCount: 0.01,
        
        // In real-time, we don't give bonuses yet, we just hunt for bots.
        tabKeyUsage: 0, 
        totalMoveEvents: 0
    };

    // 2. REDEMPTION BONUSES (Forgiving)
    // Applied ONLY at the end using the full session history.
    // Negative weights lower the score if the user acted human-like.
    private REDEMPTION_WEIGHTS: Record<string, number> = {
        // Strong bonus for using the Tab key (very human)
        tabKeyUsage: -0.3, 
        
        // Bonus for high path curvature (jittery mouse is human)
        // We will apply this manually in the final calculation
        pathCurvatureBonus: -0.15 
    };

    private BOT_THRESHOLD: number = 0.5;
    private ANALYSIS_INTERVAL_MS: number = 1000; 
    private MAX_NUMBER_OF_REAL_TIME_EVENTS: number = 500; // Sliding window size

    
    private mouseRecordsBuffer: MouseRecord[] = []; // Sliding window (for graph)
    private fullMouseHistory: MouseRecord[] = [];   // Complete history (for final verdict)
    
    private eventRecords: EventRecord[] = [];
    private keyPressRecords: number[] = [];
    private clickDurations: number[] = [];
    
    private mousedownTimestamp: number | null = null;
    private pageLoadTime: number = performance.now();
    private tracking: boolean = false;
    private tabPressCount: number = 0;

    private highestSuspicionScore: number = 0;
    private _isStaticBot: boolean = false;
    private _analysisTimer: number | null = null;
    private _onUpdateCallback: ((result: SuspicionResult) => void) | null = null;
    private _abortController: AbortController | null = null;


    constructor() {
        this._handleMouseMove = this._handleMouseMove.bind(this);
        this._handleKeyDown = this._handleKeyDown.bind(this);
        this._handleMouseDown = this._handleMouseDown.bind(this);
        this._handleMouseUp = this._handleMouseUp.bind(this);
        this._handleClick = this._handleClick.bind(this);
        this._runAnalysis = this._runAnalysis.bind(this);
    }

    public startTracking(onUpdate?: (result: SuspicionResult) => void): void {
        if (this.tracking) return;

        this._abortController = new AbortController();
        const { signal } = this._abortController;


        this._isStaticBot = this._checkStaticSignals();
        if (this._isStaticBot) {
            this.highestSuspicionScore = 1.0;
        }
        
        this._onUpdateCallback = onUpdate || null;

        document.addEventListener(ListenedEvents.MOUSE_MOVE, this._handleMouseMove, { signal });
        document.addEventListener(ListenedEvents.KEYBOARD_KEY, this._handleKeyDown, { signal });
        document.addEventListener(ListenedEvents.MOUSE_DOWN, this._handleMouseDown, { signal });
        document.addEventListener(ListenedEvents.MOUSE_UP, this._handleMouseUp, { signal });
        document.addEventListener(ListenedEvents.MOUSE_CLICK, this._handleClick, { signal });
        
        this.tracking = true;
        
        this._analysisTimer = setInterval(this._runAnalysis, this.ANALYSIS_INTERVAL_MS);
        
        console.log("Bot detection started.");
    }

    public stopTracking(): SuspicionResult {
        if (!this.tracking) return this._generateResult(this.mouseRecordsBuffer);

        // Abort removes all event listeners registered with the signal
        this._abortController?.abort();
        this._abortController = null;

        if (this._analysisTimer) {
            clearInterval(this._analysisTimer);
            this._analysisTimer = null;
        }
        
        this.tracking = false;


        const sessionFeatures = this._calculateFeatures(this.fullMouseHistory);

        // 3. Start with the Peak Score (The worst behavior they showed)
        let finalScore = this.highestSuspicionScore;

        // 4. Apply Redemption (Negative Weights) based on full session human traits
        // A) Tab Key Bonus
        const tabBonus = this._normalizeValue(sessionFeatures.tabKeyUsage, 0, 0.5) * this.REDEMPTION_WEIGHTS.tabKeyUsage;
        finalScore += tabBonus; // Adds a negative number (lowers score)

        // B) Jitter/Curvature Bonus (High curvature is good)
        // We normalize variance 0-1. High variance (1) * negative weight = score reduction
        const curvatureBonus = this._normalizeValue(sessionFeatures.pathCurvature, 0, 1) * this.REDEMPTION_WEIGHTS.pathCurvatureBonus;
        finalScore += curvatureBonus;

        // 5. Critical Fail Check
        // If they clicked without events, do NOT allow redemption to lower score below threshold
        if (sessionFeatures.hasClickWithoutPrecedingEvents === 1) {
            finalScore = Math.max(finalScore, 0.8);
        }

        // Clamp 0-1
        finalScore = Math.max(0, Math.min(1, finalScore));

        return {
            timestamp: Date.now(),
            score: finalScore,
            isBot: finalScore > this.BOT_THRESHOLD,
            features: sessionFeatures
        };
    }

    private _checkStaticSignals(): boolean {
    // Check 1: The "I am a robot" flag used by Selenium/Puppeteer
    if (navigator.webdriver) {
        console.log("Static Detection: navigator.webdriver is true");
        return true;
    }

    // Check 2: User Agent Analysis
    const ua = navigator.userAgent.toLowerCase();
    const botKeywords = ['bot', 'crawler', 'spider', 'headless', 'gptbot'];
    
    if (botKeywords.some(keyword => ua.includes(keyword))) {
        console.log("Static Detection: User Agent contains bot keyword");
        return true;
    }
    
    // Check 3: Zero Dimension Screen (Common in older headless scrapers)
    if (window.screen.width === 0 || window.screen.height === 0) {
        return true;
    }

    return false;
}

    private _handleMouseMove(event: MouseEvent): void {
        const timestamp = performance.now();
        const record = { x: event.clientX, y: event.clientY, timestamp };

        // 1. Add to Sliding Window (Buffer) - For Realtime Graph
        this.mouseRecordsBuffer.push(record);
        if (this.mouseRecordsBuffer.length > this.MAX_NUMBER_OF_REAL_TIME_EVENTS) {
            this.mouseRecordsBuffer.shift(); 
        }

        // 2. Add to Full History - For Final Verdict
        this.fullMouseHistory.push(record);
        
        if (this.eventRecords.length === 0) {
             this._recordFirstInteraction(ListenedEvents.MOUSE_MOVE, event.target, timestamp);
        }
    }

    private _handleKeyDown(event: KeyboardEvent): void {
        const timestamp = performance.now();
        this.keyPressRecords.push(timestamp);
        
        if (event.key === 'Tab' || event.code === 'Tab') {
            this.tabPressCount++;
        }

        if (this.eventRecords.length === 0) {
             this._recordFirstInteraction(ListenedEvents.KEYBOARD_KEY, event.target, timestamp);
        }
    }

    private _handleMouseDown(event: MouseEvent): void {
        this.mousedownTimestamp = performance.now();
        this.eventRecords.push({
            type: ListenedEvents.MOUSE_DOWN, 
            target: event.target ?? 'document', 
            timestamp: this.mousedownTimestamp, 
            isPrecedingEvent: true 
        });
    }

    private _handleMouseUp(event: MouseEvent): void {
        const mouseupTimestamp = performance.now();
        this.eventRecords.push({
            type: ListenedEvents.MOUSE_UP, 
            target: event.target ?? 'document', 
            timestamp: mouseupTimestamp, 
            isPrecedingEvent: true 
        });

        if (this.mousedownTimestamp !== null) {
            this.clickDurations.push(mouseupTimestamp - this.mousedownTimestamp);
            this.mousedownTimestamp = null;
        }
    }
    
    private _handleClick(event: MouseEvent): void {
        this.eventRecords.push({
            type: ListenedEvents.MOUSE_CLICK, 
            target: event.target ?? 'document', 
            timestamp: performance.now(), 
            isPrecedingEvent: false 
        });
    }

    private _recordFirstInteraction(type: string, target: any, timestamp: number) {
        this.eventRecords.push({
            type: type, 
            target: target ?? 'document', 
            timestamp, 
            isPrecedingEvent: false 
        });
    }

    // --- ANALYSIS LOGIC ---

    // Runs every second
    private _runAnalysis(): void {
        if (!this.tracking) return;

        if (this._isStaticBot) {
         if (this._onUpdateCallback) {
            this._onUpdateCallback({
                timestamp: Date.now(),
                score: 1.0,
                isBot: true,
                features: { 
                    speedVariance: 0, 
                    hasClickWithoutPrecedingEvents: 1 
                } as any
            });
        }
        return;
    }

        // Don't calculate if no event data yet
        if (this.mouseRecordsBuffer.length === 0 && this.eventRecords.length === 0) {
            console.log('%c⏳ Waiting for user interaction...', 'color: #f39c12; font-weight: bold;');
            return;
        }

        // Calculate score based on CURRENT sliding window
        const currentResult = this._generateResult(this.mouseRecordsBuffer);
        
        // Update Peak Suspicion
        if (currentResult.score > this.highestSuspicionScore) {
            this.highestSuspicionScore = currentResult.score;
        }
        
        if (this._onUpdateCallback) {
            this._onUpdateCallback(currentResult);
        }
    }

    private _generateResult(mouseData: MouseRecord[]): SuspicionResult {
        const features = this._calculateFeatures(mouseData);
        const score = this._calculateScore(features, this.REALTIME_WEIGHTS);

        return {
            timestamp: Date.now(),
            score: score,
            isBot: score > this.BOT_THRESHOLD,
            features: features
        };
    }

    private _calculateFeatures(mouseData: MouseRecord[]): FeatureSet {
        const features: FeatureSet = {} as FeatureSet; 
        
        let totalDistance = 0;
        let fixedPositionCount = 0;
        const speeds: number[] = [];
        const timeDeltas: number[] = [];
        const angles: number[] = [];

        if (mouseData.length >= 2) {
            for (let i = 1; i < mouseData.length; i++) {
                const prev = mouseData[i - 1];
                const curr = mouseData[i];

                const distance = Math.sqrt(Math.pow(curr.x - prev.x, 2) + Math.pow(curr.y - prev.y, 2));

                if (distance === 0) fixedPositionCount++;
                totalDistance += distance;

                const timeDelta = curr.timestamp - prev.timestamp;
                timeDeltas.push(timeDelta);

                if (timeDelta > 0 && distance > 0) {
                    speeds.push(distance / timeDelta);
                    if (i >= 2) {
                        const prevPrev = mouseData[i - 2];
                        const angle1 = Math.atan2(prev.y - prevPrev.y, prev.x - prevPrev.x);
                        const angle2 = Math.atan2(curr.y - prev.y, curr.x - prev.x);
                        let angleChange = Math.abs(angle2 - angle1);
                        if (angleChange > Math.PI) angleChange = 2 * Math.PI - angleChange;
                        angles.push(angleChange);
                    }
                }
            }
        }
        
        const avgSpeed = this._calculateMean(speeds);
        const avgTimeDelta = this._calculateMean(timeDeltas);
        const avgAngle = this._calculateMean(angles);

        features.speedVariance = this._calculateVariance(speeds, avgSpeed);
        features.timeDeltaVariance = this._calculateVariance(timeDeltas, avgTimeDelta);
        features.pathCurvature = this._calculateVariance(angles, avgAngle);
        features.fixedPositionCount = fixedPositionCount;
        features.totalMoveEvents = mouseData.length;
        
        // Timing & Consistency (Shared across both buffer and full history)
        const firstInteraction = this.eventRecords[0] || mouseData[0];
        features.timeToFirstInteraction = firstInteraction ? firstInteraction.timestamp - this.pageLoadTime : 10000;

        const keyInterEvents = [];
        for (let i = 1; i < this.keyPressRecords.length; i++) {
            keyInterEvents.push(this.keyPressRecords[i] - this.keyPressRecords[i - 1]);
        }
        features.keyInterEventVariance = this._calculateVariance(keyInterEvents, this._calculateMean(keyInterEvents));
        features.clickDurationVariance = this._calculateVariance(this.clickDurations, this._calculateMean(this.clickDurations));
        
        let clickCount = 0;
        let eventPairCount = 0;
        for (let i = 0; i < this.eventRecords.length; i++) {
            if (this.eventRecords[i].type === ListenedEvents.MOUSE_CLICK) {
                clickCount++;
                const isPaired = this.eventRecords.slice(Math.max(0, i - 2), i).some(e => e.isPrecedingEvent);
                if (isPaired) eventPairCount++;
            }
        }
        features.hasClickWithoutPrecedingEvents = (clickCount > 0 && eventPairCount < clickCount * 0.5) ? 1 : 0; 
        
        features.tabKeyUsage = this.keyPressRecords.length > 0 ? this.tabPressCount / this.keyPressRecords.length : 0;

        return features;
    }

    private _calculateScore(features: FeatureSet, weights: Record<keyof FeatureSet, number>): number {
        let score = 0;
        
        // Minimum data thresholds - don't judge variance without enough samples
        const MIN_MOUSE_EVENTS = 20;  // Need at least 20 mouse moves for reliable variance
        const MIN_KEY_EVENTS = 5;     // Need at least 5 keypresses
        const MIN_CLICK_EVENTS = 3;   // Need at least 3 clicks

        // 1. Mouse movement variance metrics - ONLY if we have enough data
        // Without enough data, these contribute 0 (not suspicious)
        // 
        // NORMALIZATION RANGES based on real human behavior:
        // - speedVariance: humans typically 1-10, bots near 0. Range 0-5 so human ~2 → 0.4 normalized → 0.6 suspicion
        // - timeDeltaVariance: humans have variable timing. Range 0-50
        // - pathCurvature: human jitter typically 0.05-0.3. Range 0-0.2 so human ~0.15 → 0.75 normalized → 0.25 suspicion
        //
        if (features.totalMoveEvents >= MIN_MOUSE_EVENTS) {
            score += weights.speedVariance * (1 - this._normalizeVariance(features.speedVariance, 0, 5));
            score += weights.timeDeltaVariance * (1 - this._normalizeVariance(features.timeDeltaVariance, 0, 50));
            score += weights.pathCurvature * (1 - this._normalizeVariance(features.pathCurvature, 0, 0.3));
            score += weights.fixedPositionCount * this._normalizeValue(features.fixedPositionCount, 0, features.totalMoveEvents);
        }
        
        // 2. Keyboard variance - ONLY if enough keypresses
        // Humans have variable typing speed, typically 1000-50000ms² variance
        if (this.keyPressRecords.length >= MIN_KEY_EVENTS) {
            score += weights.keyInterEventVariance * (1 - this._normalizeVariance(features.keyInterEventVariance, 0, 10000));
        }
        
        // 3. Click duration variance - ONLY if enough clicks
        // Humans hold clicks for variable durations, typically 1000-50000ms² variance
        if (this.clickDurations.length >= MIN_CLICK_EVENTS) {
            score += weights.clickDurationVariance * (1 - this._normalizeVariance(features.clickDurationVariance, 0, 10000));
        }

        // 4. Direct Values
        score += weights.hasClickWithoutPrecedingEvents * features.hasClickWithoutPrecedingEvents;
        
        // 5. Inverted TTFI (Low TTFI = High Suspicion)
        const normalizedTTFI = 1 - this._normalizeValue(features.timeToFirstInteraction, 0, 5000);
        score += weights.timeToFirstInteraction * Math.max(0, normalizedTTFI); 

        // 6. Tab Usage (If weight is 0 in realtime, this does nothing. If negative in final, it subtracts.)
        const normalizedTabUsage = this._normalizeValue(features.tabKeyUsage, 0, 0.5);
        score += weights.tabKeyUsage * normalizedTabUsage;

        return Math.max(0, Math.min(1, score));
    }

    // --- UTILITIES ---
    
    private _calculateMean(arr: number[]): number {
        if (arr.length === 0) return 0;
        return arr.reduce((a, b) => a + b, 0) / arr.length;
    }

    private _calculateVariance(arr: number[], mean: number): number {
        if (arr.length < 2) return 0;
        return arr.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / arr.length;
    }

    private _normalizeValue(value: number, min: number, max: number): number {
        if (max === min) return 0;
        return Math.min(1, Math.max(0, (value - min) / (max - min)));
    }
    
    private _normalizeVariance(variance: number, min: number, max: number): number {
        return this._normalizeValue(variance, min, max);
    }
}