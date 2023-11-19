const objectIdRegex = /^[0-9a-fA-F]{24}$/

export function objectIDValidator (id: string): boolean {
  console.log(id)
  if (objectIdRegex.test(id)) return true
  else return false
}
