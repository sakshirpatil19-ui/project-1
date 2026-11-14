const BASE_URL = '/api/todos'

export async function getTodos({ isCompleted = null, search = '' } = {}) {
  const params = new URLSearchParams()
  if (isCompleted !== null) {
    params.append('is_completed', isCompleted)
  }
  if (search && search.trim()) {
    params.append('search', search.trim())
  }

  const queryString = params.toString() ? `?${params.toString()}` : ''
  const response = await fetch(`${BASE_URL}${queryString}`)
  if (!response.ok) {
    const err = await response.json().catch(() => ({}))
    throw new Error(err.detail || 'Failed to fetch tasks')
  }
  return response.json()
}

export async function createTodo({ title, description }) {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: title.trim(),
      description: description ? description.trim() : null,
    }),
  })
  if (!response.ok) {
    const err = await response.json().catch(() => ({}))
    throw new Error(err.detail || 'Failed to create task')
  }
  return response.json()
}

export async function updateTodo(id, updates) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updates),
  })
  if (!response.ok) {
    const err = await response.json().catch(() => ({}))
    throw new Error(err.detail || 'Failed to update task')
  }
  return response.json()
}

export async function deleteTodo(id) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
  })
  if (!response.ok && response.status !== 204) {
    const err = await response.json().catch(() => ({}))
    throw new Error(err.detail || 'Failed to delete task')
  }
  return true
}
