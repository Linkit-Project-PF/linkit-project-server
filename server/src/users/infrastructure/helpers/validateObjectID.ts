const objectIdRegex = /^[0-9a-fA-F]{24}$/

export function objectIDValidator (id: string): boolean {
  if (objectIdRegex.test(id)) return true
  else return false
}
