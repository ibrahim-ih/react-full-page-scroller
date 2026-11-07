import '@testing-library/jest-dom'
import { TextDecoder, TextEncoder } from 'util'

Object.assign(globalThis, {
  IS_REACT_ACT_ENVIRONMENT: true,
  TextDecoder,
  TextEncoder
})
