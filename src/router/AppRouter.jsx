import { Navigate, Route, Routes } from 'react-router-dom'
import { AuthRoutes } from '../auth'
import { useCheckout } from '../hooks'
import { JournalRoutes } from '../journal/routes/JournalRoutes'
import { CheckingAuth } from '../ui/components'

export const AppRouter = () => {
  const status = useCheckout()

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

      <Route path='/*' element={<Navigate to='/auth/login' />} />
      {/* <Route path='/auth/*' element={<AuthRoutes />} />
      <Route path='/*' element={<JournalRoutes />} /> */}
    </Routes>
  )
}
