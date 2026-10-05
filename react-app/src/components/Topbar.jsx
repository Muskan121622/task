export default function Topbar() {
  return (
    <header className="topbar">
      <div className="brand">
        <div className="brand-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="16 18 22 12 16 6"></polyline>
            <polyline points="8 6 2 12 8 18"></polyline>
          </svg>
        </div>
        <div className="brand-text">
          <span className="brand-name">DevTask</span>
          <span className="brand-sub">Intern Portal</span>
        </div>
      </div>

      <div className="task-badge">
        <div className="task-badge-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18h6"></path>
            <path d="M10 22h4"></path>
            <path d="M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.4 1 2.3h6c0-.9.4-1.8 1-2.3A7 7 0 0 0 12 2z"></path>
          </svg>
        </div>
        <div className="task-badge-text">
          <span className="task-badge-title">Web Developer Intern Task</span>
          <span className="task-badge-sub">Frontend Assignment</span>
        </div>
      </div>
    </header>
  )
}
