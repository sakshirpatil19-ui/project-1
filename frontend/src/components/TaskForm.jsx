import React, { useState } from 'react'
import { PlusCircle, AlignLeft, X } from 'lucide-react'

export default function TaskForm({ onAddTask, isSubmitting }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [showDesc, setShowDesc] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title.trim()) {
      setError('Task title cannot be empty')
      return
    }
    setError('')
    onAddTask({ title, description: showDesc ? description : '' })
    setTitle('')
    setDescription('')
    setShowDesc(false)
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="input-row">
        <input
          type="text"
          className={`task-input ${error ? 'input-error' : ''}`}
          placeholder="What needs to be done? (e.g. Design API endpoints)"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value)
            if (error) setError('')
          }}
          disabled={isSubmitting}
        />
        <button
          type="button"
          className={`toggle-desc-btn ${showDesc ? 'active' : ''}`}
          title={showDesc ? 'Remove description' : 'Add description'}
          onClick={() => setShowDesc(!showDesc)}
        >
          {showDesc ? <X size={18} /> : <AlignLeft size={18} />}
        </button>
        <button
          type="submit"
          className="add-task-btn"
          disabled={isSubmitting || !title.trim()}
        >
          <PlusCircle size={18} />
          <span>{isSubmitting ? 'Adding...' : 'Add Task'}</span>
        </button>
      </div>

      {showDesc && (
        <div className="desc-input-container">
          <textarea
            className="desc-textarea"
            placeholder="Add additional details, notes, or subtasks... (optional)"
            rows={2}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={isSubmitting}
          />
        </div>
      )}

      {error && <p className="form-error-msg">{error}</p>}
    </form>
  )
}
