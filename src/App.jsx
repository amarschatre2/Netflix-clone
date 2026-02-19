import { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.jsx'
import AppRoutes from './routes/AppRoutes.jsx'

function App() {
  const [searchTerm, setSearchTerm] = useState('Batman')

  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
