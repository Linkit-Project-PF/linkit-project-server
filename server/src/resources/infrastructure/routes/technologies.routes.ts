import { Router } from 'express'
import stack from '../schema/Stack'
import { ServerError, UncatchedError, type customError } from '../../../errors/errors'

const stackRouter = Router()

// eslint-disable-next-line @typescript-eslint/no-misused-promises
stackRouter.get('/', async (req, res): Promise<any> => {
  try {
    const response = await stack.find({})
    res.status(200).json(response)
  } catch (error: any) {
    const newError = new UncatchedError(error.message, 'obtain technologies', 'traer la lista de tecnologias')
    res.status(500).json(newError[(req as any).lang as keyof customError])
  }
})

// eslint-disable-next-line @typescript-eslint/no-misused-promises
stackRouter.post('/', async (req, res): Promise<any> => {
  try {
    const { name } = req.body
    if (!name) throw new ServerError('Stack name is needed to be added', 'El nombre de la tecnologia es necesario para agregar', 406)
    const existing = await stack.find({ name: name.toLowerCase() })
    if (existing.length) throw new ServerError('That exact stack name already exists on register', 'El nombre de la tecnologia ya existe', 409)
    await stack.create({ name: name.toLowerCase() })
    const response = await stack.find()
    res.status(200).json(response)
  } catch (error: any) {
    if (error instanceof ServerError) return res.status(error.code).json(error[(req as any).lang as keyof Error])
    else {
      const newError = new UncatchedError(error.message, 'create a new stack', 'crear una nueva tecnologia')
      return res.status(500).json(newError[(req as any).lang as keyof customError])
    }
  }
})

// eslint-disable-next-line @typescript-eslint/no-misused-promises
stackRouter.delete('/:name', async (req, res): Promise<any> => {
  try {
    const { name } = req.params
    const matchedStack = await stack.find({ name: name.toLowerCase() })
    if (!matchedStack.length) throw new ServerError('No stack found under that name', 'No existe tecnologia con ese nombre', 404)
    await stack.deleteOne({ _id: matchedStack[0]._id })
    const response = await stack.find()
    res.status(200).json(response)
  } catch (error: any) {
    if (error instanceof ServerError) return res.status(error.code).json(error[(req as any).lang as keyof Error])
    else {
      const newError = new UncatchedError(error.message, 'delete stack', 'eliminar una tecnologia')
      return res.status(500).json(newError[(req as any).lang as keyof customError])
    }
  }
})

// eslint-disable-next-line @typescript-eslint/no-misused-promises
stackRouter.put('/', async (req, res): Promise<any> => {
  try {
    const { name, edit } = req.body
    if (!name || !edit) throw new ServerError("'name' and 'edit' are required for this route", 'El nombre y su nuevo valor son necesarios', 406)
    if (typeof edit !== 'string') throw new ServerError('Stack name only receives strings', 'El nombre de la tecnologia debe ser una cadena de texto', 409)
    const [matchedStack] = await stack.find({ name: name.toLowerCase() })
    if (!matchedStack) throw new ServerError('No stack found under that name', 'No existe una tecnologia con ese nombre', 404)
    matchedStack.name = edit
    await stack.findOneAndReplace({ _id: matchedStack._id }, matchedStack)
    const response = await stack.find()
    res.status(200).json(response)
  } catch (error: any) {
    if (error instanceof ServerError) return res.status(error.code).json(error[(req as any).lang as keyof Error])
    else {
      const newError = new UncatchedError(error.message, 'edit stack', 'editar una tecnologia')
      return res.status(500).json(newError[(req as any).lang as keyof customError])
    }
  }
})

export default stackRouter
