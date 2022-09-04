import { fireEvent, render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { MemoryRouter } from 'react-router-dom'
import { LoginPage } from '../../../auth/pages/LoginPage'
import { authSlice } from '../../../store'
import { startGoogleSignIn } from '../../../store/auth/thunks'
import { notAuthenticatedState } from '../../authFixtures/authFixtures'

// name mock is importan
const mockStartGoogleSignIn = jest.fn()
const mockStartLoginWithEmailPassword = jest.fn()

jest.mock('../../../store/auth/thunks', () => ({
  startGoogleSignIn: () => mockStartGoogleSignIn,
  startLoginWithEmailPassword: ({ email, password }) => {
    return () => mockStartLoginWithEmailPassword({ email, password })
  }
}))

// sobreescribir una libreria o cualquier funcion
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => (fn) => fn()
}))

const store = configureStore({
  reducer: { auth: authSlice.reducer },
  preloadedState: {
    auth: notAuthenticatedState
  }
})

describe('test on <LoginPage />', () => {
  //import clean function when use jest fn
  beforeEach(() => jest.clearAllMocks())
  test('should to show component', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    )

    expect(screen.getAllByText('Login').length).toBeGreaterThanOrEqual(1)
  })

  test('google button should to call startGoogleSignIn', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    )

    const googleBtn = screen.getByLabelText('google-button')
    fireEvent.click(googleBtn)
    expect(mockStartGoogleSignIn).toHaveBeenCalled()
  })

  test('submit should to login with email and pass', () => {
    const email = 'test@test.com'
    const password = '123456'

    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    )

    const emailField = screen.getByRole('textbox', { name: 'email' })
    fireEvent.change(emailField, { target: { name: 'email', value: email } })

    const passField = screen.getByTestId('password', { name: 'password' })
    fireEvent.change(passField, { target: { name: 'password', value: password } })

    const loginForm = screen.getByLabelText('submit-form')
    fireEvent.submit(loginForm)

    expect(mockStartLoginWithEmailPassword).toHaveBeenCalledWith({ email, password })
  })
})
