import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

const Navbar = ({ onSearchChange, currentSearch }) => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const query = formData.get('q')?.toString().trim() ?? ''
    onSearchChange(query || 'Batman')
  }

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  const initials = user?.name
    ?.split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase())
    .join('') || 'NF'

  return (
    <header className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-logo">
          NETFLIX
        </Link>
        <nav className="navbar-links">
          <NavLink to="/" end className={({ isActive }) => (isActive ? 'active-link' : undefined)}>
            Home
          </NavLink>
        </nav>
      </div>

      <div className="navbar-right">
        <form className="navbar-search-form" onSubmit={handleSubmit}>
          <input
            name="q"
            type="search"
            placeholder="Search movies"
            defaultValue={currentSearch}
            className="navbar-search-input"
          />
          <button type="submit" className="navbar-search-button" aria-label="Search movies">
            🔍
          </button>
        </form>

        {user && (
          <>
            <div className="navbar-user">
              <div className="navbar-avatar" aria-hidden="true">
                {initials}
              </div>
              <span>{user.name}</span>
            </div>
            <button type="button" className="navbar-logout" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </div>
    </header>
  )
}

export default Navbar

