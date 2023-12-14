import { ServerError } from '../../../errors/errors'

const objectIdRegex = /^[0-9a-fA-F]{24}$/

export function objectIDValidator (id: string, originen: string, origines: string): boolean | never {
  if (objectIdRegex.test(id)) return true
  else throw new ServerError(`The ID provided as ${originen} is not a valid ID type`, `El ID de ${origines} no es un tipo valido de ID`, 406)
}
