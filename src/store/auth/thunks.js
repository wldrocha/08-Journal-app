import {
  registerUserWithEmailPassword,
  signInWithGoogle,
  loginWithEmailPassword,
  logoutFirebase
} from '../../firebase/providers'
import { clearNotesLogout } from '../journal'
import { checkingCredentials, logout, login } from './'

export const checkingAuthentication = () => {
  return async (dispatch) => {
    dispatch(checkingCredentials())
  }
}

export const startGoogleSignIn = () => {
  return async (dispatch) => {
    dispatch(checkingCredentials())
    const result = await signInWithGoogle()

    if (result.success === false) dispatch(logout(result.errorMessage))

    dispatch(login(result))
  }
}

export const startCreatingUserWithEmailPassword = ({ email, password, displayName }) => {
  return async (dispatch) => {
    dispatch(checkingCredentials())

    const result = await registerUserWithEmailPassword({
      email,
      password,
      displayName
    })

    if (!result?.success) return dispatch(logout(result?.errorMessage))

    dispatch(login(result))
  }
}

export const startLoginWithEmailPassword = ({ email, password }) => {
  return async (dispatch) => {
    dispatch(checkingCredentials())

    const result = await loginWithEmailPassword({ email, password })

    if (!result.success) return dispatch(logout(result))

    dispatch(login(result))
  }
}

export const startLogout = () => {
  return async (dispatch) => {
    await logoutFirebase()

    dispatch(logout({}))
    dispatch(clearNotesLogout())
  }
}
