import { checkingCredentials } from '../../../store/auth'
import { checkingAuthentication } from '../../../store/auth/thunks'

jest.mock('../../../firebase/providers')

describe('authThunks test', () => {
  const dispatch = jest.fn()
  beforeEach(() => jest.clearAllMocks())

  test('should invoke the checkingCredential', async () => {
    await checkingAuthentication()(dispatch)

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials())
  })
})
