const MIN = 0
const MAX = 18 // highest possible sum of two single digits

export default function HumanVerification({
  questionText,
  counter,
  verified,
  onMinus,
  onPlus,
  onRefresh,
}) {
  return (
    <div className="field">
      <span className="field-label">Verify You're Human</span>
      <p className="verify-hint">Solve the math below to continue</p>

      <div className="verify-row">
        <div className="question-box" aria-live="polite">
          <span className="question-text">{questionText}</span>
          <button type="button" className="refresh-btn" onClick={onRefresh} aria-label="Get a new question" title="New question">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="23 4 23 10 17 10"></polyline>
              <polyline points="1 20 1 14 7 14"></polyline>
              <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
            </svg>
          </button>
        </div>

        <div className="counter-box">
          <button type="button" className="counter-btn" onClick={onMinus} disabled={counter <= MIN} aria-label="Decrease">−</button>
          <span className={`counter-value${verified ? ' correct' : ''}`} aria-live="polite">{counter}</span>
          <button type="button" className="counter-btn" onClick={onPlus} disabled={counter >= MAX} aria-label="Increase">+</button>
        </div>
      </div>
    </div>
  )
}
