import { useEffect, useState } from 'react'
import HumanVerification from './HumanVerification.jsx'

const MIN = 0
const MAX = 18 // highest possible sum of two single digits

function makeQuestion() {
  const num1 = Math.floor(Math.random() * 10)
  const num2 = Math.floor(Math.random() * 10)
  return { num1, num2, answer: num1 + num2 }
}

export default function LoginCard() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [question, setQuestion] = useState(makeQuestion)
  const [counter, setCounter] = useState(MIN)
  const [success, setSuccess] = useState(false)

  const verified = counter === question.answer
  const canSubmit = username.trim() !== '' && password.trim() !== '' && verified

  // Refresh: new question + reset counter (no page reload)
  function refreshQuestion() {
    setQuestion(makeQuestion())
    setCounter(MIN)
  }

  // Reset the success state 2s after submit
  useEffect(() => {
    if (!success) return
    const timer = setTimeout(() => setSuccess(false), 2000)
    return () => clearTimeout(timer)
  }, [success])

  function handleSubmit(e) {
    e.preventDefault()
    if (!canSubmit) return
    setSuccess(true)
  }

  return (
    <section className="login-card">
      <div className="card-lock">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2"></rect>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          <circle cx="12" cy="16.5" r="1.2" fill="currentColor" stroke="none"></circle>
        </svg>
      </div>

      <h1 className="card-title">Welcome Back</h1>
      <p className="card-subtitle">Sign in to continue your task</p>

      <form onSubmit={handleSubmit} noValidate>
        {/* Username */}
        <div className="field">
          <label htmlFor="username">Username</label>
          <div className="input-wrap">
            <span className="input-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </span>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your username"
              autoComplete="username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        </div>

        {/* Password */}
        <div className="field">
          <label htmlFor="password">Password</label>
          <div className="input-wrap">
            <span className="input-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            </span>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              placeholder="Enter your password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="input-toggle"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
            </button>
          </div>
        </div>

        {/* Human verification */}
        <HumanVerification
          questionText={`${question.num1} + ${question.num2} = ?`}
          counter={counter}
          verified={verified}
          onMinus={() => setCounter((c) => Math.max(MIN, c - 1))}
          onPlus={() => setCounter((c) => Math.min(MAX, c + 1))}
          onRefresh={refreshQuestion}
        />

        {/* Submit */}
        <button type="submit" className={`submit-btn${success ? ' success' : ''}`} disabled={!canSubmit}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          </svg>
          <span>{success ? 'Verified — Signing In…' : 'Submit'}</span>
        </button>
      </form>
    </section>
  )
}
