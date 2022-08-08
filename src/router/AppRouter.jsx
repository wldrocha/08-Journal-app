import { useDispatch, useSelector } from 'react-redux'
import { onAuthStateChanged } from 'firebase/auth'
import { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { AuthRoutes } from '../auth'
import { FirebaseAuth } from '../firebase'
import { JournalRoutes } from '../journal/routes/JournalRoutes'
import { CheckingAuth } from '../ui/components'
import { login, logout } from '../store'

export const AppRouter = () => {
  const { status } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  useEffect(() => {
    onAuthStateChanged(FirebaseAuth, (user) => {
      if (!user) return dispatch(logout())
      const { uid, email, displayName, photoURL } = user
      dispatch(login({ uid, email, displayName, photoURL }))
    })
  }, [])

  if (status === 'checking') {
    return <CheckingAuth />
  }
  return (
    <Routes>
      {status === 'authenticated' ? (
        <Route path='/*' element={<JournalRoutes />} />
      ) : (
        <Route path='/auth/*' element={<AuthRoutes />} />
      )}

      <Route path='/*' element={<Navigate to="/auth/login" />} />
      {/* <Route path='/auth/*' element={<AuthRoutes />} />
      <Route path='/*' element={<JournalRoutes />} /> */}
    </Routes>
  )
}
