# TaskFlow - Full-Stack To-Do List Application

A modern, responsive full-stack To-Do List web application built with **FastAPI** (Python), **React** (Vite), and **SQL** (SQLite via SQLAlchemy).

---

## 🚀 Features

- **CRUD Operations:** Create, Read, Update, and Delete tasks in real-time.
- **Task Details & Notes:** Add optional multiline descriptions to tasks.
- **Status Toggling:** Quickly mark tasks as completed or active with instant visual feedback.
- **Filtering & Search:** Filter by *All*, *Active*, or *Completed*, with live client-side search.
- **Live Progress & Stats:** Interactive counters and progress percentage bar.
- **Persistent Storage:** Stored in a SQL database with SQLAlchemy ORM.
- **Interactive REST API Docs:** Interactive Swagger UI provided out-of-the-box by FastAPI.

---

## 📁 Project Structure

```
project-1/
├── backend/
│   ├── .venv/                 # Python virtual environment
│   ├── main.py                # FastAPI app entry & API routes
│   ├── models.py              # SQLAlchemy database models
│   ├── schemas.py             # Pydantic request/response schemas
│   ├── crud.py                # Database CRUD operations
│   ├── database.py            # SQLite connection & session
│   ├── todos.db               # SQLite database file
│   └── requirements.txt       # Backend dependencies
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx     # Header & summary badge
│   │   │   ├── StatsCard.jsx  # Task progress & counters
│   │   │   ├── TaskForm.jsx   # New task input form
│   │   │   ├── FilterBar.jsx  # Status filter tabs & search input
│   │   │   ├── TaskItem.jsx   # Individual task item (edit/delete/check)
│   │   │   └── TaskList.jsx   # Task list view & empty states
│   │   ├── api.js             # API communication layer
│   │   ├── App.jsx            # Main React application component
│   │   ├── App.css            # Component styles & animations
│   │   ├── index.css          # Global styling & variables
│   │   └── main.jsx           # React DOM root
│   ├── package.json           # Frontend dependencies & scripts
│   ├── vite.config.js         # Vite configuration with API proxy
│   └── index.html             # HTML entry point
├── run_backend.bat            # Quick launcher for backend
├── run_frontend.bat           # Quick launcher for frontend
└── TECH_STACK.md              # Technical stack documentation
```

---

## ⚙️ How to Run

### 1. Start the Backend (FastAPI)

Open a terminal or command prompt:

```powershell
cd C:\Project\project-1\backend
.\.venv\Scripts\activate
uvicorn main:app --reload --port 8000
```

- API Base URL: `http://127.0.0.1:8000`
- Interactive API Documentation (Swagger): `http://127.0.0.1:8000/docs`

*(Or simply double-click `run_backend.bat`)*

---

### 2. Start the Frontend (React + Vite)

Open a second terminal or command prompt:

```powershell
cd C:\Project\project-1\frontend
npm run dev
```

- Web App: `http://localhost:5173`

*(Or simply double-click `run_frontend.bat`)*
