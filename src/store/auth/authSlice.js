import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  status: 'not-auntheicated', // 'checking', ''not-auntheicated', 'autenticated'
  uid: null,
  email: null,
  displayName: null,
  photoUrl: null,
  errorMessage: null
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, { payload }) => {
      state.status = 'auntheicated'
      state.uid = payload.uid
      state.email = payload.email
      state.displayName = payload.displayName
      state.photoUrl = payload.photoUrl
      state.errorMessage = null
    },
    logout: (state, { payload }) => {
      state.status = 'not-auntheicated'
      state.uid = null
      state.email = null
      state.displayName = null
      state.photoUrl = null
      state.errorMessage = payload.errorMessage
    },
    checkingCredentials: (state) => {
      state.status = 'checking'
    }
  }
})

// Action creators are generated for each case reducer function
export const { login, logout, checkingCredentials } = authSlice.actions
