import { NavLink, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Teams from './components/Teams'
import Users from './components/Users'
import Workouts from './components/Workouts'
import './App.css'

const navItems = [
  { to: '/', label: 'Users' },
  { to: '/teams', label: 'Teams' },
  { to: '/activities', label: 'Activities' },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/workouts', label: 'Workouts' },
]

function App() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

  return (
    <main className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="card shadow-sm">
            <div className="card-body p-5">
              <h1 className="display-6 fw-bold">OctoFit Tracker</h1>
              <p className="lead text-muted">
                A modern multi-tier fitness tracking experience for teams and individuals.
              </p>
              <div className="alert alert-info mb-4">
                <strong>API configuration:</strong> set <code>VITE_CODESPACE_NAME</code> in <code>.env.local</code> to use a Codespaces URL such as <code>https://{codespaceName || 'your-codespace'}-8000.app.github.dev/api</code>.
                If it is unset, the app uses the localhost API at <code>http://localhost:8000/api</code>.
              </div>
              <nav className="nav nav-pills flex-wrap gap-2 mb-4">
                {navItems.map((item) => (
                  <NavLink key={item.to} className="nav-link" to={item.to}>
                    {item.label}
                  </NavLink>
                ))}
              </nav>
              <Routes>
                <Route path="/" element={<Users />} />
                <Route path="/teams" element={<Teams />} />
                <Route path="/activities" element={<Activities />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
                <Route path="/workouts" element={<Workouts />} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default App
