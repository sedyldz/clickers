import { RealTimeBotDetector, SuspicionResult } from './RealTimeBotDetector';
import { WaveCanvas } from './WaveCanvas';
import { AnalyticsPanel } from './AnalyticsPanel';
import { AudioEngine } from './AudioEngine';

class VisualizationApp {
    private detector: RealTimeBotDetector;
    private waveCanvas: WaveCanvas;
    private analyticsPanel: AnalyticsPanel;
    private audioEngine: AudioEngine;
    private instructionsEl: HTMLElement;
    private sampleButtonEl: HTMLElement;
    private lastMouseMoveTime: number = performance.now();
    private inactivityTimer: number | null = null;
    private isVolumeLow: boolean = false;
    private readonly INACTIVITY_THRESHOLD_MS = 3000; // 3 seconds

    constructor() {
        // Initialize components
        this.detector = new RealTimeBotDetector();
        this.waveCanvas = new WaveCanvas('wave-canvas');
        this.analyticsPanel = new AnalyticsPanel('analytics-panel');
        this.audioEngine = new AudioEngine();

        // Get DOM elements
        this.instructionsEl = document.getElementById('instructions') as HTMLElement;
        this.sampleButtonEl = document.getElementById('sample-click-btn') as HTMLElement;

        // Auto-enable audio on load
        this.handleEnableAudio();

        // Setup event listeners
        this.setupEventListeners();

        // Start bot detection
        this.detector.startTracking((result: SuspicionResult) => {
            this.analyticsPanel.update(result);
        });

        // Setup wave canvas callbacks
        this.waveCanvas.setCallbacks(
            (x: number, y: number, velocity: number) => {
                this.handleMouseMove(x, y, velocity);
            },
            () => {
                this.handleMouseDown();
            }
        );

        // Start inactivity monitoring
        this.startInactivityMonitoring();
    }

    private setupEventListeners(): void {
        // Sample click button
        if (this.sampleButtonEl) {
            this.sampleButtonEl.addEventListener('click', () => {
                // Resume audio on click
                this.audioEngine.resume();
                // This click will be detected by the bot detector
                // If clicked without mouse movement, it will be flagged
            });
        }

        // Also resume audio on any click anywhere
        document.addEventListener('click', () => {
            this.audioEngine.resume();
        }, { once: true });

        // Resume on any mouse move
        document.addEventListener('mousemove', () => {
            this.audioEngine.resume();
        }, { once: true });
    }

    private handleEnableAudio(): void {
        this.audioEngine.init();
        this.analyticsPanel.setAudioEnabled(true);
        if (this.instructionsEl) {
            this.instructionsEl.style.display = 'block';
        }
    }

    private handleMouseMove(x: number, y: number, velocity: number): void {
        // Update last mouse move time
        this.lastMouseMoveTime = performance.now();

        // Resume audio context on first user interaction
        this.audioEngine.resume();

        // Restore volume if it was low
        if (this.isVolumeLow) {
            this.audioEngine.setVolumeNormal();
            this.isVolumeLow = false;
        }

        // Reset inactivity timer
        this.resetInactivityTimer();

        if (this.audioEngine.getIsEnabled() && velocity > 30) {
            this.audioEngine.playTone(
                'main',
                x,
                y,
                window.innerWidth,
                window.innerHeight,
                velocity
            );
        }
    }

    private handleMouseDown(): void {
        // Resume audio context on user interaction
        this.audioEngine.resume();

        // Update last mouse move time on mouse down as well
        this.lastMouseMoveTime = performance.now();
        if (this.isVolumeLow) {
            this.audioEngine.setVolumeNormal();
            this.isVolumeLow = false;
        }
        this.resetInactivityTimer();
    }

    private startInactivityMonitoring(): void {
        this.resetInactivityTimer();
    }

    private resetInactivityTimer(): void {
        if (this.inactivityTimer !== null) {
            clearTimeout(this.inactivityTimer);
        }

        this.inactivityTimer = window.setTimeout(() => {
            const timeSinceLastMove = performance.now() - this.lastMouseMoveTime;
            if (timeSinceLastMove >= this.INACTIVITY_THRESHOLD_MS && !this.isVolumeLow) {
                this.audioEngine.setVolumeLow();
                this.isVolumeLow = true;
            }
        }, this.INACTIVITY_THRESHOLD_MS);
    }
}

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new VisualizationApp();
    });
} else {
    new VisualizationApp();
}

