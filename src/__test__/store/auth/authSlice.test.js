import { authSlice, checkingCredentials, login, logout } from '../../../store/auth/authSlice'
import { demoUser, initialState, authenticatedState, notAuthenticatedState } from '../../authFixtures/authFixtures'

describe('test on authSlice', () => {
  test('should return initial state and auth send', () => {
    expect(authSlice.name).toBe('auth')
    const state = authSlice.reducer(initialState, {})
    expect(state).toEqual(initialState)
  })

  test('should auth', () => {
    const state = authSlice.reducer(initialState, login(demoUser))

    expect(state).toEqual({ ...demoUser })
  })

  test('should logout without arguments', () => {
    const state = authSlice.reducer(authenticatedState, logout())
    expect(state).toEqual({ ...notAuthenticatedState })
  })

  test('should logout with error message', () => {
    const errorMessage = 'Credenciales incorrectas'

    const state = authSlice.reducer(authenticatedState, logout({ errorMessage }))
    expect(state).toEqual({ ...notAuthenticatedState, errorMessage })
  })

  test('should change status to checking', () => {
    const state = authSlice.reducer(authenticatedState, checkingCredentials())
    expect(state.status).toBe('checking')
  })
})
