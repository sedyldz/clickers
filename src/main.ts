import './style.css'
import { BotDetector } from './BotDetector'

const app = document.querySelector<HTMLDivElement>('#app')

if (!app) {
  throw new Error('Missing #app root element')
}

const detector = new BotDetector()

// Start tracking as soon as the app boots
detector.startTracking()

app.innerHTML = `
  <div>
    <h1>Bot Detector Demo</h1>
    <p>
      Move your mouse and press keys like a normal user for a few seconds.
      When you're ready, click the button below to analyze the activity.
    </p>
    <div class="card">
      <button id="analyze" type="button">Analyze activity</button>
    </div>
    <pre id="results" class="read-the-docs"></pre>
  </div>
`

const analyzeButton = document.querySelector<HTMLButtonElement>('#analyze')
const resultsElement = document.querySelector<HTMLPreElement>('#results')

if (!analyzeButton || !resultsElement) {
  throw new Error('Missing analyze button or results element')
}

analyzeButton.addEventListener('click', () => {
  const result = detector.stopTracking()

  const display = {
    score: Number(result.score.toFixed(4)),
    isBot: result.isBot,
    features: result.features,
  }

  resultsElement.textContent = JSON.stringify(display, null, 2)
})


