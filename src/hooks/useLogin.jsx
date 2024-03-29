import { signInWithEmailAndPassword } from 'firebase/auth'
import { useState, useEffect } from 'react'
import { projectAuth, projectFirestore } from '../firebase/config'
import { useAuthContext } from './useAuthContext'
import { doc, updateDoc } from 'firebase/firestore'

export const useLogin = () => {
  const [isCancelled, setIsCancelled] = useState(false)
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const { dispatch } = useAuthContext()

  const login = async (email, password) => {
    setError(null)
    setIsPending(true)

    try {
      // login
      const res = await signInWithEmailAndPassword(projectAuth, email, password)

      // update online status on document
      const myDocRef = doc(projectFirestore, 'users', res.user.uid)
      await updateDoc(myDocRef, {
        online: true
      })

      // dispatch login action
      dispatch({ type: 'LOGIN', payload: res.user })

      if (!isCancelled) {
        setIsPending(false)
        setError(null)
      }
    } catch (err) {
      if (!isCancelled) {
        setError(err.message)
        setIsPending(false)
      }
    }
  }

  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  return { login, isPending, error }
}
