import React from 'react'
import { ListTodo, CheckCircle2, Clock, Award } from 'lucide-react'

export default function StatsCard({ total, completed, pending }) {
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0

  return (
    <section className="stats-container">
      <div className="stat-card">
        <div className="stat-icon total">
          <ListTodo size={22} />
        </div>
        <div className="stat-content">
          <span className="stat-value">{total}</span>
          <span className="stat-label">Total Tasks</span>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon pending">
          <Clock size={22} />
        </div>
        <div className="stat-content">
          <span className="stat-value">{pending}</span>
          <span className="stat-label">In Progress</span>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon completed">
          <CheckCircle2 size={22} />
        </div>
        <div className="stat-content">
          <span className="stat-value">{completed}</span>
          <span className="stat-label">Completed</span>
        </div>
      </div>

      <div className="stat-card progress-card">
        <div className="progress-header">
          <div className="progress-info">
            <Award size={18} className="progress-icon" />
            <span className="stat-label">Progress</span>
          </div>
          <span className="progress-percent">{percent}%</span>
        </div>
        <div className="progress-bar-bg">
          <div
            className="progress-bar-fill"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>
    </section>
  )
}
