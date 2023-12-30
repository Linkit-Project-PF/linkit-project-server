import { ServerError } from '../../errors/errors'
import { validateJSONBody } from '../../errors/validation'
import { type Entry, readFile, newValue, mutateFile } from '../infrastructure/helpers/JSONfiles'

export async function getInfo (filePath: string): Promise<any> {
  const info = await readFile(filePath)
  return JSON.parse(info).entries
}

export async function addInfo (filePath: string, entry: Entry): Promise<void> {
  validateJSONBody(entry)
  await newValue(filePath, entry)
}

export async function deleteInfo (filePath: string, id: string): Promise<void> {
  if (!id) throw new ServerError('ID is required by query', 'El ID falta por query', 406)
  const localid = parseInt(id)
  if (Number.isNaN(id)) throw new ServerError('ID must be a number', 'El ID debe ser un numero', 406)
  await mutateFile(filePath, localid)
}
