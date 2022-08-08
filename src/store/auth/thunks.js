import { registerUserWithEmailPassword, signInWithGoogle } from '../../firebase/providers'
import { checkingCredentials, logout, login } from './'

export const checkingAuthentication = ({ email, password }) => {
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
    if (!success) return dispatch(logout({errorMessage}))

    dispatch(login({ uid, photoURL, email, displayName }))
  }
}
