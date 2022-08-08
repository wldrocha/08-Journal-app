import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile
} from 'firebase/auth'
import { FirebaseAuth } from '.'

const googleProvider = new GoogleAuthProvider()

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(FirebaseAuth, googleProvider)
    // const credentials = GoogleAuthProvider.credentialFromResult(result)
    const { displayName, email, photoURL, uid } = result.user
    return {
      success: true,
      displayName,
      email,
      photoURL,
      uid
    }
  } catch (error) {
    const errorMessage = error.message
    return {
      success: false,
      errorMessage
    }
  }
}

export const registerUserWithEmailPassword = async ({ email, password, displayName }) => {
  try {
    const response = await createUserWithEmailAndPassword(FirebaseAuth, email, password)
    const { uid, photoURL } = response.user

    await updateProfile(FirebaseAuth.currentUser, { displayName })
    return {
      success: true,
      photoURL,
      email,
      displayName
    }
  } catch (error) {
    // console.log(error)
    return { success: false, errorMessage: error.message }
  }
}

export const loginWithEmailPassword = async ({ email, password }) => {
  try {
    const response = await signInWithEmailAndPassword(FirebaseAuth, email, password)

    const { uid, photoURL, displayName } = response.user
    return {
      success: true,
      uid,
      photoURL,
      email,
      displayName
    }
  } catch (error) {
    return { success: false, errorMessage: error.message }
  }
}

export const logoutFirebase = async () => {
  return await FirebaseAuth.signOut()
}
