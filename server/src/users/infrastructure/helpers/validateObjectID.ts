const objectIdRegex = /^[0-9a-fA-F]{24}$/

export function objectIDValidator (id: string, origin: string): boolean | never {
  if (objectIdRegex.test(id)) return true
  else throw Error(`The ID provided as ${origin} is not a valid ID type`)
}
