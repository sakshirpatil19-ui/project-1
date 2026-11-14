import React from 'react'
import TaskItem from './TaskItem'
import { Inbox, CheckCircle, SearchX } from 'lucide-react'

export default function TaskList({
  todos,
  isLoading,
  error,
  filter,
  searchQuery,
  onToggle,
  onUpdate,
  onDelete,
}) {
  if (isLoading) {
    return (
      <div className="empty-state">
        <div className="spinner"></div>
        <p className="empty-text">Loading tasks...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="error-banner">
        <p>⚠️ {error}</p>
      </div>
    )
  }

  if (todos.length === 0) {
    if (searchQuery) {
      return (
        <div className="empty-state">
          <SearchX size={44} className="empty-icon" />
          <h3 className="empty-title">No matching tasks found</h3>
          <p className="empty-text">
            No tasks match "{searchQuery}". Try searching for something else.
          </p>
        </div>
      )
    }

    if (filter === 'completed') {
      return (
        <div className="empty-state">
          <CheckCircle size={44} className="empty-icon" />
          <h3 className="empty-title">No completed tasks yet</h3>
          <p className="empty-text">Complete tasks to see them listed here!</p>
        </div>
      )
    }

    if (filter === 'active') {
      return (
        <div className="empty-state">
          <CheckCircle size={44} className="empty-icon text-success" />
          <h3 className="empty-title">All caught up!</h3>
          <p className="empty-text">There are no pending tasks right now.</p>
        </div>
      )
    }

    return (
      <div className="empty-state">
        <Inbox size={48} className="empty-icon" />
        <h3 className="empty-title">No tasks yet</h3>
        <p className="empty-text">
          Add your first task above to get started organizing your day!
        </p>
      </div>
    )
  }

  return (
    <div className="task-list">
      {todos.map((todo) => (
        <TaskItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}
