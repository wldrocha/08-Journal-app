import { signInWithGoogle } from '../../../firebase/providers'
import { checkingCredentials, login, logout } from '../../../store/auth'
import { checkingAuthentication, startGoogleSignIn } from '../../../store/auth/thunks'
import { demoUser } from '../../authFixtures/authFixtures'

jest.mock('../../../firebase/providers')

describe('authThunks test', () => {
  const dispatch = jest.fn()
  beforeEach(() => jest.clearAllMocks())

  test('should invoke the checkingCredential', async () => {
    await checkingAuthentication()(dispatch)

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials())
  })

  test(' startGoogleSignIn should to call to checkingCredentials and login', async () => {
    const loginData = { success: true, ...demoUser }

    //mock for popup
    await signInWithGoogle.mockResolvedValue(loginData)

    await startGoogleSignIn()(dispatch)
    //evaluate thunk
    expect(dispatch).toHaveBeenCalledWith(checkingCredentials())

    expect(dispatch).toHaveBeenCalledWith(login(loginData))
  })

  test('startGoogleSignIn should to call to checkingCredentials and logout error', async () => {
    const loginData = { success: false, errorMessage: 'Hubo un error' }

    //mock for popup
    await signInWithGoogle.mockResolvedValue(loginData)

    await startGoogleSignIn()(dispatch)
    //evaluate thunk
    expect(dispatch).toHaveBeenCalledWith(checkingCredentials())

    expect(dispatch).toHaveBeenCalledWith(logout(loginData.errorMessage))
  })
})