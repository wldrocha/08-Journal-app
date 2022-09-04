// import '@testing-library/jest-dom'
import 'whatwg-fetch'
import 'setimmediate'
import { getEnvironments } from './src/helpers'

require('dotenv').config({ path: '.env.test' })

jest.mock('./src/helpers/getEnvironments', () => ({ getEnvironments: () => ({ ...process.env }) }))
