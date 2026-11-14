import React, { useState, useEffect, useMemo, useCallback } from 'react'
import Navbar from './components/Navbar'
import StatsCard from './components/StatsCard'
import TaskForm from './components/TaskForm'
import FilterBar from './components/FilterBar'
import TaskList from './components/TaskList'
import { getTodos, createTodo, updateTodo, deleteTodo } from './api'
import './App.css'

export default function App() {
  const [todos, setTodos] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [filter, setFilter] = useState('all') // 'all' | 'active' | 'completed'
  const [searchQuery, setSearchQuery] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [toast, setToast] = useState(null)

  const showToast = (message) => {
    setToast(message)
    setTimeout(() => {
      setToast(null)
    }, 2800)
  }

  const loadTodos = useCallback(async () => {
    try {
      setErrorMessage('')
      const data = await getTodos()
      setTodos(data)
    } catch (err) {
      console.error(err)
      setErrorMessage('Could not load tasks. Is the backend running?')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    loadTodos()
  }, [loadTodos])

  // Stats computation
  const stats = useMemo(() => {
    const total = todos.length
    const completed = todos.filter((t) => t.is_completed).length
    const pending = total - completed
    return { total, completed, pending }
  }, [todos])

  // Filtered & searched todos
  const filteredTodos = useMemo(() => {
    return todos.filter((todo) => {
      // Filter status
      if (filter === 'active' && todo.is_completed) return false
      if (filter === 'completed' && !todo.is_completed) return false

      // Search match
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase()
        const matchTitle = todo.title.toLowerCase().includes(query)
        const matchDesc = todo.description
          ? todo.description.toLowerCase().includes(query)
          : false
        return matchTitle || matchDesc
      }

      return true
    })
  }, [todos, filter, searchQuery])

  // Add task handler
  const handleAddTask = async ({ title, description }) => {
    setIsSubmitting(true)
    try {
      const newTodo = await createTodo({ title, description })
      setTodos((prev) => [newTodo, ...prev])
      showToast('Task added successfully!')
    } catch (err) {
      console.error(err)
      alert(err.message || 'Failed to add task')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Toggle status handler
  const handleToggleTodo = async (id, is_completed) => {
    try {
      // Optimistic update
      setTodos((prev) =>
        prev.map((t) => (t.id === id ? { ...t, is_completed } : t))
      )
      await updateTodo(id, { is_completed })
      showToast(is_completed ? 'Task completed! 🎉' : 'Task marked as pending')
    } catch (err) {
      console.error(err)
      // Revert on failure
      loadTodos()
      alert('Failed to update task status')
    }
  }

  // Edit details handler
  const handleUpdateTodo = async (id, updates) => {
    try {
      const updated = await updateTodo(id, updates)
      setTodos((prev) => prev.map((t) => (t.id === id ? updated : t)))
      showToast('Task updated!')
    } catch (err) {
      console.error(err)
      alert('Failed to save changes')
    }
  }

  // Delete handler
  const handleDeleteTodo = async (id) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return
    try {
      // Optimistic removal
      setTodos((prev) => prev.filter((t) => t.id !== id))
      await deleteTodo(id)
      showToast('Task deleted')
    } catch (err) {
      console.error(err)
      loadTodos()
      alert('Failed to delete task')
    }
  }

  return (
    <div className="app-container">
      <Navbar
        totalCount={stats.total}
        completedCount={stats.completed}
      />

      <StatsCard
        total={stats.total}
        completed={stats.completed}
        pending={stats.pending}
      />

      <TaskForm onAddTask={handleAddTask} isSubmitting={isSubmitting} />

      <FilterBar
        filter={filter}
        onFilterChange={setFilter}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        counts={{
          all: stats.total,
          active: stats.pending,
          completed: stats.completed,
        }}
      />

      <TaskList
        todos={filteredTodos}
        isLoading={isLoading}
        error={errorMessage}
        filter={filter}
        searchQuery={searchQuery}
        onToggle={handleToggleTodo}
        onUpdate={handleUpdateTodo}
        onDelete={handleDeleteTodo}
      />

      {toast && <div className="toast">{toast}</div>}
    </div>
  )
}
