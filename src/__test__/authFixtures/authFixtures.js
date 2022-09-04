export const initialState = {
  status: 'checking',
  uid: null,
  email: null,
  displayName: null,
  photoUrl: null,
  errorMessage: null
}

export const authenticatedState = {
  status: 'authenticated',
  uid: '123ABC',
  email: 'test@test.com',
  displayName: 'Jhon Doe',
  photoUrl: 'https://test.jpg',
  errorMessage: null
}

export const notAuthenticatedState = {
  status: 'not-authenticated',
  uid: null,
  email: null,
  displayName: null,
  photoUrl: null,
  errorMessage: undefined
}

export const demoUser = {
  status: 'authenticated',
  uid: '123ABC',
  email: 'test@test.com',
  displayName: 'Demo user',
  photoUrl: 'https://test.jpg',
  errorMessage: null
}
