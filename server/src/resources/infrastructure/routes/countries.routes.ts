import { Router } from 'express'
import { ServerError, UncatchedError, type customError } from '../../../errors/errors'
import { addInfo, deleteInfo, getInfo } from '../../methods/resourcesJSON.methods'

const countriesRouter = Router()
const filePath = './src/resources/infrastructure/schema/countries.json'

// eslint-disable-next-line @typescript-eslint/no-misused-promises
countriesRouter.get('/', async (req, res) => {
  const response = await getInfo(filePath)
  res.status(200).json(response)
})

// eslint-disable-next-line @typescript-eslint/no-misused-promises
countriesRouter.post('/', async (req, res) => {
  try {
    await addInfo(filePath, req.body)
    res.status(201).json('Created')
  } catch (error: any) {
    if (error instanceof ServerError) return res.status(error.code).json(error[(req as any).lang as keyof Error])
    else {
      const newError = new UncatchedError(error.message, 'create a new country', 'crear un nuevo pais')
      return res.status(500).json(newError[(req as any).lang as keyof customError])
    }
  }
})

// eslint-disable-next-line @typescript-eslint/no-misused-promises
countriesRouter.delete('/', async (req, res) => {
  try {
    await deleteInfo(filePath, req.query.id as string)
    res.status(200).json('Deleted')
  } catch (error: any) {
    if (error instanceof ServerError) return res.status(error.code).json(error[(req as any).lang as keyof Error])
    else {
      const newError = new UncatchedError(error.message, 'delete a country', 'eliminar el pais')
      return res.status(500).json(newError[(req as any).lang as keyof customError])
    }
  }
})

export default countriesRouter
