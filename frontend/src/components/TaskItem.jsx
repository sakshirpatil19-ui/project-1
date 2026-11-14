import React, { useState } from 'react'
import {
  Check,
  Trash2,
  Edit3,
  Calendar,
  Save,
  X,
  ChevronDown,
  ChevronUp,
} from 'lucide-react'

export default function TaskItem({ todo, onToggle, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(todo.title)
  const [editDesc, setEditDesc] = useState(todo.description || '')
  const [showFullDesc, setShowFullDesc] = useState(false)

  const handleSave = (e) => {
    e.preventDefault()
    if (!editTitle.trim()) return
    onUpdate(todo.id, {
      title: editTitle.trim(),
      description: editDesc.trim() || null,
    })
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditTitle(todo.title)
    setEditDesc(todo.description || '')
    setIsEditing(false)
  }

  const formattedDate = new Date(todo.created_at).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })

  return (
    <div className={`task-item ${todo.is_completed ? 'completed' : ''}`}>
      {isEditing ? (
        <form className="edit-form" onSubmit={handleSave}>
          <input
            type="text"
            className="edit-input"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            autoFocus
          />
          <textarea
            className="edit-textarea"
            placeholder="Edit description..."
            rows={2}
            value={editDesc}
            onChange={(e) => setEditDesc(e.target.value)}
          />
          <div className="edit-actions">
            <button type="submit" className="save-btn" title="Save changes">
              <Save size={16} /> Save
            </button>
            <button
              type="button"
              className="cancel-btn"
              onClick={handleCancel}
              title="Cancel"
            >
              <X size={16} /> Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="task-content-wrapper">
          <button
            className={`checkbox-custom ${todo.is_completed ? 'checked' : ''}`}
            onClick={() => onToggle(todo.id, !todo.is_completed)}
            title={todo.is_completed ? 'Mark as incomplete' : 'Mark as complete'}
          >
            {todo.is_completed && <Check size={14} strokeWidth={3} />}
          </button>

          <div className="task-body">
            <div className="task-title-row">
              <span className="task-title">{todo.title}</span>
              <span className={`status-badge ${todo.is_completed ? 'done' : 'pending'}`}>
                {todo.is_completed ? 'Completed' : 'Pending'}
              </span>
            </div>

            {todo.description && (
              <div className="task-desc-container">
                <p className={`task-desc ${showFullDesc ? 'expanded' : ''}`}>
                  {todo.description}
                </p>
                {todo.description.length > 80 && (
                  <button
                    className="toggle-more-btn"
                    onClick={() => setShowFullDesc(!showFullDesc)}
                  >
                    {showFullDesc ? (
                      <>
                        Less <ChevronUp size={12} />
                      </>
                    ) : (
                      <>
                        More <ChevronDown size={12} />
                      </>
                    )}
                  </button>
                )}
              </div>
            )}

            <div className="task-footer">
              <span className="task-date">
                <Calendar size={12} /> {formattedDate}
              </span>
            </div>
          </div>

          <div className="task-actions">
            <button
              className="action-btn edit-icon-btn"
              onClick={() => setIsEditing(true)}
              title="Edit task"
            >
              <Edit3 size={16} />
            </button>
            <button
              className="action-btn delete-icon-btn"
              onClick={() => onDelete(todo.id)}
              title="Delete task"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
