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

jest.mock('../../../store/auth/thunks', () => ({
  startGoogleSignIn: () => mockStartGoogleSignIn
}))

const store = configureStore({
  reducer: { auth: authSlice.reducer },
  preloadedState: {
    auth: notAuthenticatedState
  }
})

describe('test on <LoginPage />', () => {
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
})
