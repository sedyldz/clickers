import { RealTimeBotDetector, SuspicionResult } from './RealTimeBotDetector';

// 1. Initialize
const detector = new RealTimeBotDetector();

// DOM Elements (Type casting is important in TypeScript!)
const liveScoreEl = document.getElementById('live-score') as HTMLElement;
const liveStatsEl = document.getElementById('live-stats') as HTMLElement;
const calcBtn = document.getElementById('calc-btn') as HTMLButtonElement;
const finalSection = document.getElementById('final-section') as HTMLElement;
const finalScoreEl = document.getElementById('final-score') as HTMLElement;
const finalVerdictEl = document.getElementById('final-verdict') as HTMLElement;
const finalStatsEl = document.getElementById('final-stats') as HTMLElement;

// Helper to colorize scores
function getScoreColor(score: number): string {
    if (score < 0.3) return 'safe'; // Green
    if (score < 0.6) return 'sus';  // Orange
    return 'bot';                   // Red
}

// Helper to create stat rows
function renderStats(features: any, container: HTMLElement) {
    const relevantStats = [
        { label: 'Speed Var', val: features.speedVariance },
        { label: 'Curvature (Jitter)', val: features.pathCurvature },
        { label: 'Tab Usage', val: features.tabKeyUsage },
        { label: 'Ghost Clicks', val: features.hasClickWithoutPrecedingEvents },
        { label: 'TTFI (ms)', val: features.timeToFirstInteraction }
    ];

    container.innerHTML = relevantStats.map(stat => `
        <div class="stat-row">
            <span class="stat-label">${stat.label}</span>
            <span class="stat-val">${stat.val.toFixed(4)}</span>
        </div>
    `).join('');
}

// 2. Start Tracking with Real-Time Callback
console.log("Initializing tracking...");

detector.startTracking((result: SuspicionResult) => {
    // --- REAL TIME UPDATES ---
    if (!liveScoreEl) return;

    // Update Score
    liveScoreEl.innerText = result.score.toFixed(2);
   
    // Update Color
    liveScoreEl.className = `score-big ${getScoreColor(result.score)}`;

    // Update Stats List
    renderStats(result.features, liveStatsEl);
});

// 3. Handle Stop Button
if (calcBtn) {
    calcBtn.addEventListener('click', () => {
        // --- FINAL VERDICT ---
       
        const result = detector.stopTracking();
       
        // Show the hidden panel
        finalSection.style.display = 'block';
   
        // Update Final Score
        finalScoreEl.innerText = result.score.toFixed(2);
        finalScoreEl.className = `score-big ${getScoreColor(result.score)}`;
   
        // Update Verdict Text
        if (result.isBot) {
            finalVerdictEl.innerText = "BOT DETECTED 🤖";
            finalVerdictEl.style.color = "#c0392b";
        } else {
            finalVerdictEl.innerText = "HUMAN VERIFIED ✅";
            finalVerdictEl.style.color = "#27ae60";
        }
   
        // Update Final Stats
        renderStats(result.features, finalStatsEl);
       
        // Disable button
        calcBtn.disabled = true;
        calcBtn.innerText = "Calculation Complete";
    });
}