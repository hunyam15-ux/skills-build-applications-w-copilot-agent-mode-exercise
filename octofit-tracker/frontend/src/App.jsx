import { Navigate, NavLink, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

const pages = [
  { path: '/users', label: 'Users', component: Users },
  { path: '/activities', label: 'Activities', component: Activities },
  { path: '/teams', label: 'Teams', component: Teams },
  { path: '/leaderboard', label: 'Leaderboard', component: Leaderboard },
  { path: '/workouts', label: 'Workouts', component: Workouts },
]

function App() {
  return (
    <div className="app-shell">
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="container flex-wrap gap-2">
          <NavLink className="navbar-brand" to="/users">
            OctoFit Tracker
          </NavLink>
          <div className="navbar-nav flex-row flex-wrap">
            {pages.map(({ path, label }) => (
              <NavLink
                className={({ isActive }) =>
                  `nav-link${isActive ? ' active' : ''}`
                }
                key={path}
                to={path}
              >
                {label}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>

      <main className="container py-4">
        <Routes>
          {pages.map(({ path, component: Page }) => (
            <Route element={<Page />} key={path} path={path} />
          ))}
          <Route element={<Navigate replace to="/users" />} path="*" />
        </Routes>
      </main>
    </div>
  )
}

export default App
