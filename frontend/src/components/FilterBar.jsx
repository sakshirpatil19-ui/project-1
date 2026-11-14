import React from 'react'
import { Search, X } from 'lucide-react'

export default function FilterBar({
  filter,
  onFilterChange,
  searchQuery,
  onSearchChange,
  counts,
}) {
  return (
    <div className="filter-bar">
      <div className="filter-tabs">
        <button
          className={`tab-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => onFilterChange('all')}
        >
          All
          <span className="count-pill">{counts.all}</span>
        </button>
        <button
          className={`tab-btn ${filter === 'active' ? 'active' : ''}`}
          onClick={() => onFilterChange('active')}
        >
          Active
          <span className="count-pill">{counts.active}</span>
        </button>
        <button
          className={`tab-btn ${filter === 'completed' ? 'active' : ''}`}
          onClick={() => onFilterChange('completed')}
        >
          Completed
          <span className="count-pill">{counts.completed}</span>
        </button>
      </div>

      <div className="search-box">
        <Search size={16} className="search-icon" />
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        {searchQuery && (
          <button
            className="clear-search-btn"
            onClick={() => onSearchChange('')}
            title="Clear search"
          >
            <X size={14} />
          </button>
        )}
      </div>
    </div>
  )
}
