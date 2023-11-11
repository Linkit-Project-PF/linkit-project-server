import { ValidationError, ConnectionError } from './errors'

export const returnUserError = (message: string): string => {
  throw new ValidationError(message)
}

export const returnConectError = (message: string): string => {
  throw new ConnectionError(message)
}
