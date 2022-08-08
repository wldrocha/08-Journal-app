import { async } from '@firebase/util'
import {
  registerUserWithEmailPassword,
  signInWithGoogle,
  loginWithEmailPassword,
  logoutFirebase
} from '../../firebase/providers'
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

    const { success, uid, photoURL, errorMessage } = await registerUserWithEmailPassword({
      email,
      password,
      displayName
    })

    if (!success) return dispatch(logout({ errorMessage }))

    dispatch(login({ uid, photoURL, email, displayName }))
  }
}

export const startLoginWithEmailPassword = ({ email, password }) => {
  return async (dispatch) => {
    dispatch(checkingCredentials())

    const { success, uid, photoURL, displayName, errorMessage } = await loginWithEmailPassword({ email, password })

    if (!success) return dispatch(logout({ errorMessage }))

    dispatch(login({ uid, photoURL, email, displayName }))
  }
}

export const startLogout = () => {
  return async (dispatch) => {
    await logoutFirebase()

    dispatch(logout({}))
  }
}
