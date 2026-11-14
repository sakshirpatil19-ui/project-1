import React from 'react'
import { CheckSquare, Sparkles } from 'lucide-react'

export default function Navbar({ totalCount, completedCount }) {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  })

  return (
    <header className="navbar">
      <div className="navbar-brand">
        <div className="logo-badge">
          <CheckSquare className="logo-icon" size={26} />
        </div>
        <div>
          <h1 className="navbar-title">TaskFlow</h1>
          <p className="navbar-subtitle">FastAPI &amp; React To-Do Application</p>
        </div>
      </div>
      <div className="navbar-meta">
        <span className="navbar-date">{today}</span>
        <span className="navbar-badge">
          <Sparkles size={14} />
          {completedCount}/{totalCount} Completed
        </span>
      </div>
    </header>
  )
}
