import { Outlet, Route, Routes } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import ProtectedRoute from '../components/ProtectedRoute.jsx'
import Home from '../pages/Home.jsx'
import Login from '../pages/Login.jsx'
import Signup from '../pages/Signup.jsx'
import MovieDetails from '../pages/MovieDetails.jsx'

const AppLayout = ({ onSearchChange, searchTerm }) => {
  return (
    <>
      <Navbar onSearchChange={onSearchChange} currentSearch={searchTerm} />
      <main className="page">
        <Outlet />
      </main>
    </>
  )
}

const AppRoutes = ({ searchTerm, onSearchChange }) => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route
        element={
          <ProtectedRoute>
            <AppLayout searchTerm={searchTerm} onSearchChange={onSearchChange} />
          </ProtectedRoute>
        }
      >
        <Route index element={<Home searchTerm={searchTerm} />} />
        <Route path="movie/:imdbID" element={<MovieDetails />} />
      </Route>

      <Route path="*" element={<Login />} />
    </Routes>
  )
}

export default AppRoutes

