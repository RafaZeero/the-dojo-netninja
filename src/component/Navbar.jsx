//styles
import './Navbar.css'
import Temple from '../assets/temple.svg'
import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'

export default function Navbar({ user }) {
  const { logout, isPending } = useLogout()

  return (
    <div className="navbar">
      <ul>
        <li className="logo">
          <img src={Temple} alt="dojo logo" />
          <span>The Dojo</span>
        </li>
        {user ? (
          <>
            <li>
              <span className="displayName">{user.displayName}</span>
            </li>
            <li>
              {isPending ? (
                <button className="btn" disabled>
                  Logging out...
                </button>
              ) : (
                <button className="btn" onClick={logout}>
                  Logout
                </button>
              )}
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="login">Login</Link>
            </li>
            <li>
              <Link to="signup">Signup</Link>
            </li>
          </>
        )}
      </ul>
    </div>
  )
}
