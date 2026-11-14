# Tech Stack - To-Do List Application

A full-stack To-Do List web application built using **React** for the frontend, **FastAPI** for the backend, and a **SQL** database for data persistence.

---

## 1. Frontend

- **Library / Framework:** [React](https://react.dev/) (via Vite)
- **Language:** JavaScript / TypeScript
- **Styling:** Tailwind CSS or Modern CSS
- **HTTP Client:** Axios or native Fetch API (for REST API communication)
- **State Management:** React Hooks (`useState`, `useEffect`)
- **Icons:** Lucide React or React Icons

### Responsibilities
- User interface for viewing, creating, editing, and deleting tasks.
- Task status toggles (pending / completed).
- Filtering tasks (All, Active, Completed).
- Handling API requests and displaying feedback/loading states.

---

## 2. Backend

- **Framework:** [FastAPI](https://fastapi.tiangolo.com/) (Python)
- **ASGI Server:** Uvicorn
- **Data Validation & Serialization:** Pydantic
- **CORS Middleware:** `fastapi.middleware.cors.CORSMiddleware` (for React frontend communication)

### Responsibilities
- Provide RESTful API endpoints for CRUD operations (`/api/todos`).
- Request validation and response schemas.
- Database session management and business logic.

---

## 3. Database

- **Database Engine:** SQL Database
  - **Development / Local:** [SQLite](https://www.sqlite.org/) (zero-config, file-based)
  - **Production:** [PostgreSQL](https://www.postgresql.org/) or [MySQL](https://www.mysql.com/)
- **ORM (Object-Relational Mapping):** [SQLAlchemy](https://www.sqlalchemy.org/)
- **Database Migrations (Optional):** Alembic

### Schema Overview (`todos` table)
| Column | Type | Description |
|---|---|---|
| `id` | Integer / UUID | Primary Key |
| `title` | String | Task title / description |
| `description` | Text (optional) | Detailed task notes |
| `is_completed` | Boolean | Completion status (default: `False`) |
| `created_at` | DateTime | Timestamp when task was created |
| `updated_at` | DateTime | Timestamp when task was last updated |

---

## 4. API Specification (RESTful)

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/todos` | Fetch all to-do items |
| `GET` | `/api/todos/{id}` | Fetch a single to-do item by ID |
| `POST` | `/api/todos` | Create a new to-do item |
| `PUT` / `PATCH` | `/api/todos/{id}` | Update task details or toggle status |
| `DELETE` | `/api/todos/{id}` | Delete a to-do item |

---

## 5. Development & Environment Tools

- **Python Runtime:** Python 3.10+
- **Python Package Manager:** `pip` with virtual environment (`venv`)
- **Node Runtime:** Node.js (v18+) & `npm` / `pnpm`
- **Version Control:** Git & GitHub
