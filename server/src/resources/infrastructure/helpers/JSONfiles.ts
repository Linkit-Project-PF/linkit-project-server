import * as fs from 'fs'
import { ServerError, UncatchedError } from '../../../errors/errors'

export interface Entry {
  id: number
  name: string
}

// READ

export async function readFile (filePath: string): Promise<string> {
  return await new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

// WRITE

export async function writeFile (filePath: string, content: string): Promise<void> {
  await new Promise((resolve, reject) => {
    fs.writeFile(filePath, content, 'utf8', (err) => {
      if (err) reject(err)
      else resolve('') //!
    })
  })
}

// Create Entry

export async function newValue (filePath: string, entry: Entry): Promise<void> {
  try {
    const fileContent = await readFile(filePath)
    const data: { entries: Entry[] } = JSON.parse(fileContent)
    data.entries.forEach(localentry => { if (entry.id === localentry.id) throw new ServerError('ID already exists', 'ID ya existe', 409) })
    data.entries.forEach(localentry => { if (entry.name === localentry.name) throw new ServerError('Entry name already exists', 'Ese nombre ya existe', 409) })
    data.entries.push(entry)
    const updatedJson = JSON.stringify(data, null, 2)
    await writeFile(filePath, updatedJson)
  } catch (error: any) {
    if (error instanceof ServerError) throw error
    throw new UncatchedError(error.message, 'creating a new record on file', 'crear un nuevo registro en el archivo')
  }
}

// Delete entry

export async function mutateFile (filePath: string, id: number): Promise<void> {
  try {
    const fileContent = await readFile(filePath)
    const data: { entries: Entry[] } = JSON.parse(fileContent)
    const recordIndex = data.entries.findIndex((entry) => entry.id === id)
    if (recordIndex !== -1) {
      data.entries.splice(recordIndex, 1)
    } else throw new ServerError('Record not found', 'No se encontro el registro', 404)
    const updatedJson = JSON.stringify(data, null, 2)
    await writeFile(filePath, updatedJson)
  } catch (error: any) {
    if (error instanceof ServerError) throw error
    else throw new UncatchedError(error.message, 'trying to remove record from file', 'eliminar registro del archivo')
  }
}
