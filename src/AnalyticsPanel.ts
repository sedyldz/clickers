import { SuspicionResult } from './RealTimeBotDetector';

export class AnalyticsPanel {
    private panel: HTMLElement;
    private suspicionScoreEl: HTMLElement;
    private meterFillEl: HTMLElement;
    private speedVarianceEl: HTMLElement;
    private timeDeltaVarianceEl: HTMLElement;
    private pathCurvatureEl: HTMLElement;
    private curvatureMeterEl: HTMLElement;
    private totalMoveEventsEl: HTMLElement;
    private eventsMeterEl: HTMLElement;
    private timeToFirstEl: HTMLElement;
    private warningSectionEl: HTMLElement;
    private warningListEl: HTMLElement;
    private detectionResultEl: HTMLElement;
    private audioIndicatorEl: HTMLElement;

    constructor(panelId: string) {
        this.panel = document.getElementById(panelId) as HTMLElement;
        if (!this.panel) {
            throw new Error(`Panel element with id "${panelId}" not found`);
        }

        // Get all elements
        this.suspicionScoreEl = document.getElementById('suspicion-score') as HTMLElement;
        this.meterFillEl = document.getElementById('meter-fill') as HTMLElement;
        this.speedVarianceEl = document.getElementById('speed-variance') as HTMLElement;
        this.timeDeltaVarianceEl = document.getElementById('time-delta-variance') as HTMLElement;
        this.pathCurvatureEl = document.getElementById('path-curvature') as HTMLElement;
        this.curvatureMeterEl = document.getElementById('curvature-meter') as HTMLElement;
        this.totalMoveEventsEl = document.getElementById('total-move-events') as HTMLElement;
        this.eventsMeterEl = document.getElementById('events-meter') as HTMLElement;
        this.timeToFirstEl = document.getElementById('time-to-first') as HTMLElement;
        this.warningSectionEl = document.getElementById('warning-flags') as HTMLElement;
        this.warningListEl = document.getElementById('warning-list') as HTMLElement;
        this.detectionResultEl = document.getElementById('detection-result') as HTMLElement;
        this.audioIndicatorEl = document.getElementById('audio-indicator') as HTMLElement;

        this.show();
    }

    public show(): void {
        this.panel.style.display = 'block';
    }

    public hide(): void {
        this.panel.style.display = 'none';
    }

    public update(result: SuspicionResult): void {
        const suspicionPercentage = Math.round(result.score * 100);

        // Update suspicion score
        this.suspicionScoreEl.textContent = `${suspicionPercentage}%`;
        this.suspicionScoreEl.className = 'score-value';
        if (result.score > 0.5) {
            this.suspicionScoreEl.classList.add('danger');
        } else if (result.score > 0.3) {
            this.suspicionScoreEl.classList.add('warning');
        } else {
            this.suspicionScoreEl.classList.add('safe');
        }

        // Update meter
        const percentage = Math.min(100, result.score * 100);
        this.meterFillEl.style.width = `${percentage}%`;
        this.meterFillEl.className = 'meter-fill';
        if (result.score > 0.5) {
            this.meterFillEl.classList.add('danger');
        } else if (result.score > 0.3) {
            this.meterFillEl.classList.add('warning');
        }

        // Update stats
        if (result.features) {
            this.speedVarianceEl.textContent = result.features.speedVariance?.toFixed(3) ?? '0';
            this.timeDeltaVarianceEl.innerHTML = `${result.features.timeDeltaVariance?.toFixed(2) ?? '0'} <span class="unit">ms²</span>`;
            this.pathCurvatureEl.textContent = result.features.pathCurvature?.toFixed(3) ?? '0';
            this.totalMoveEventsEl.textContent = String(result.features.totalMoveEvents ?? 0);
            this.timeToFirstEl.innerHTML = `${result.features.timeToFirstInteraction?.toFixed(0) ?? '0'} <span class="unit">ms</span>`;

            // Update curvature meter
            const curvaturePercent = Math.min(100, ((result.features.pathCurvature ?? 0) / 0.5) * 100);
            this.curvatureMeterEl.style.width = `${curvaturePercent}%`;

            // Update events meter
            const eventsPercent = Math.min(100, ((result.features.totalMoveEvents ?? 0) / 500) * 100);
            this.eventsMeterEl.style.width = `${eventsPercent}%`;

            // Update warning flags
            const warnings: string[] = [];
            if (result.features.hasClickWithoutPrecedingEvents === 1) {
                warnings.push('Click without preceding events');
            }
            if (result.features.hasClickWithoutMouseMovement === 1) {
                warnings.push('Click without mouse movement');
            }
            if (result.features.initialMousePositionAtOrigin === 1) {
                warnings.push('Initial position at origin (0,0)');
            }

            if (warnings.length > 0) {
                this.warningSectionEl.style.display = 'flex';
                this.warningListEl.innerHTML = warnings.map(w => `<li>• ${w}</li>`).join('');
            } else {
                this.warningSectionEl.style.display = 'none';
            }
        }

        // Update detection result
        if (result.isBot) {
            this.detectionResultEl.className = 'result-badge bot';
            this.detectionResultEl.innerHTML = `
                <svg class="result-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
                    <line x1="12" y1="18" x2="12.01" y2="18"/>
                </svg>
                <span>Bot</span>
            `;
        } else {
            this.detectionResultEl.className = 'result-badge';
            this.detectionResultEl.innerHTML = `
                <svg class="result-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                </svg>
                <span>Human</span>
            `;
        }
    }

    public setAudioEnabled(enabled: boolean): void {
        if (enabled) {
            this.audioIndicatorEl.classList.add('active');
        } else {
            this.audioIndicatorEl.classList.remove('active');
        }
    }
}

