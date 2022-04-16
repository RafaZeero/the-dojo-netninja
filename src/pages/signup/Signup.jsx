import { useState } from 'react'
import { useSignup } from '../../hooks/useSignup'
//styles
import './Signup.css'

export default function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [thumbnail, setThumbnail] = useState(null)
  const [thumbnailError, setThumbnailError] = useState(null)
  const { signup, isPending, error } = useSignup()

  const handleSubmit = e => {
    e.preventDefault()
    signup(email, password, displayName, thumbnail)
  }

  const handleFileChange = e => {
    setThumbnail(null)
    let fileSelected = e.target.files[0]

    if (!fileSelected) {
      setThumbnailError('Please select a file')
      return
    }
    if (!fileSelected.type.includes('image')) {
      setThumbnailError('Selected file must be an image')
      return
    }
    if (fileSelected.size >= 300000) {
      setThumbnailError('Image file size must be less than 300Kb')
      return
    }

    setThumbnailError(null) //limpando erros
    setThumbnail(fileSelected)
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>Sign up</h2>
      <label>
        <span>Email:</span>
        <input
          type="email"
          required
          onChange={e => setEmail(e.target.value)}
          value={email}
        />
      </label>
      <label>
        <span>Password:</span>
        <input
          type="password"
          required
          onChange={e => setPassword(e.target.value)}
          value={password}
        />
      </label>
      <label>
        <span>Display Name:</span>
        <input
          type="text"
          required
          onChange={e => setDisplayName(e.target.value)}
          value={displayName}
        />
      </label>
      <label>
        <span>Profile Thumbnail:</span>
        <input
          type="file"
          required
          onChange={handleFileChange}
          // onChange={e => setThumbnail(e.target.value)}// não funciona da mesma forma
          // value={thumbnail}
        />
        {thumbnailError && <div className="error">{thumbnailError}</div>}
      </label>

      {isPending ? (
        <button className="btn" disabled>
          Loading...
        </button>
      ) : (
        <button className="btn">Sign up</button>
      )}
      {error && <div className="error">{error}</div>}
    </form>
  )
}
