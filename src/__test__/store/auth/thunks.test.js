import {
  loginWithEmailPassword,
  logoutFirebase,
  signInWithGoogle,
  registerUserWithEmailPassword
} from '../../../firebase/providers'
import { checkingCredentials, login, logout } from '../../../store/auth/authSlice'
import {
  checkingAuthentication,
  startGoogleSignIn,
  startCreatingUserWithEmailPassword,
  startLoginWithEmailPassword,
  startLogout
} from '../../../store/auth/thunks'
import { clearNotesLogout } from '../../../store/journal/journalSlice'
import { demoUser } from '../../authFixtures/authFixtures'

jest.mock('../../../firebase/providers')

describe('authThunks test', () => {
  const dispatch = jest.fn()
  beforeEach(() => jest.clearAllMocks())

  test('should invoke the checkingCredential', async () => {
    await checkingAuthentication()(dispatch)

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials())
  })

  test('startGoogleSignIn should to call to checkingCredentials and login', async () => {
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

  test('startCreatingUserWithEmailPassword should to call login - success', async () => {
    const loginData = { success: true, ...demoUser, password: '123456' }

    // importar y declarar la función interna a mockear
    await registerUserWithEmailPassword.mockResolvedValue(loginData)
    // luego llamar a la función del thunk con sus parametros y dispatch
    await startCreatingUserWithEmailPassword(loginData)(dispatch)
    //verificar que el dispatch llame a las funciones respectivas
    expect(dispatch).toHaveBeenCalledWith(checkingCredentials())

    expect(dispatch).toHaveBeenCalledWith(login(loginData))
  })

  test('startCreatingUserWithEmailPassword should to call to checkingCredentials and logout error', async () => {
    const loginData = { success: false, errorMessage: 'Hubo un error' }

    const formData = { email: demoUser.email, password: '123456' }

    // importar y declarar la función interna a mockear
    await registerUserWithEmailPassword.mockResolvedValue(formData)
    // luego llamar a la función del thunk con sus parametros y dispatch
    await startCreatingUserWithEmailPassword(formData)(dispatch)
    //verificar que el dispatch llame a las funciones respectivas
    expect(dispatch).toHaveBeenCalledWith(checkingCredentials())

    expect(dispatch).toHaveBeenCalledWith(logout())
  })

  test('startLoginWithEmailPassword should to call to checkingCredentials and login - success', async () => {
    const loginData = { success: false, errorMessage: 'Hubo un error', ...demoUser }
    const formData = { email: demoUser.email, password: '123456' }

    await loginWithEmailPassword.mockResolvedValue(loginData)

    await startLoginWithEmailPassword(formData)(dispatch)

    //evaluate thunk
    expect(dispatch).toHaveBeenCalledWith(checkingCredentials())

    expect(dispatch).toHaveBeenCalledWith(logout(loginData))
  })

  test('startLoginWithEmailPassword should to call to checkingCredentials and login - Error', async () => {
    const loginData = { success: false, errorMessage: 'Hubo un error' }

    const formData = { email: demoUser.email, password: '123456' }

    //mock for popup
    await loginWithEmailPassword.mockResolvedValue(loginData)

    await startLoginWithEmailPassword(formData)(dispatch)
    //evaluate thunk
    expect(dispatch).toHaveBeenCalledWith(checkingCredentials())

    expect(dispatch).toHaveBeenCalledWith(logout(loginData))
  })

  test('startLogout should to call to logoutFirebase, clear notes and logout', async () => {
    await startLogout()(dispatch)

    expect(logoutFirebase).toHaveBeenCalled()

    expect(dispatch).toHaveBeenCalledWith(clearNotesLogout())
  })
})
