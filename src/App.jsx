import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'

//styles
import './App.css'
import Navbar from './component/Navbar'
import Sidebar from './component/Sidebar'
//pages and components
import Create from './pages/create/Create'
import Dashboard from './pages/dashboard/Dashboard'
import Login from './pages/login/Login'
import Project from './pages/project/Project'
import Signup from './pages/signup/Signup'

function App() {
  const { user, authIsReady } = useAuthContext()
  return (
    <div className="App">
      {authIsReady && (
        <BrowserRouter>
          {user && <Sidebar />}
          <div className="container">
            <Navbar user={user} />
            <Routes>
              <Route
                path="/"
                element={
                  user ? <Dashboard /> : <Navigate replace to="/login" />
                }
              />
              <Route
                path="create"
                element={user ? <Create /> : <Navigate replace to="/login" />}
              />
              <Route
                path="projects/:id"
                element={user ? <Project /> : <Navigate replace to="/login" />}
              />
              <Route
                path="login"
                element={user ? <Navigate replace to="/" /> : <Login />}
              />
              <Route
                path="signup"
                element={user ? <Navigate replace to="/" /> : <Signup />}
              />
              <Route
                path="*"
                element={user ? <Navigate replace to="/" /> : <Login />}
              />
            </Routes>
          </div>
        </BrowserRouter>
      )}
    </div>
  )
}

export default App
