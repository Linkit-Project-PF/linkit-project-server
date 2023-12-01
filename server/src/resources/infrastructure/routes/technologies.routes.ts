import { Router } from 'express'
import stack from '../schema/Stack'

const stackRouter = Router()

// eslint-disable-next-line @typescript-eslint/no-misused-promises
stackRouter.get('/', async (req, res): Promise<void> => {
  try {
    const response = await stack.find({})
    res.status(200).json(response)
  } catch (error: any) {
    res.status(400).json('Error fetching stack data' + error.message)
  }
})

// eslint-disable-next-line @typescript-eslint/no-misused-promises
stackRouter.post('/', async (req, res): Promise<void> => {
  try {
    const { name } = req.body
    if (!name) throw Error('Stack name is needed to be added')
    const existing = await stack.find({ name: name.toLowerCase() })
    if (existing.length) throw Error('That exact stack name already exists on register')
    await stack.create({ name: name.toLowerCase() })
    const response = await stack.find()
    res.status(200).json(response)
  } catch (error: any) {
    res.status(400).json('Error creating stack data: ' + error.message)
  }
})

// eslint-disable-next-line @typescript-eslint/no-misused-promises
stackRouter.delete('/:name', async (req, res): Promise<void> => {
  try {
    const { name } = req.params
    const matchedStack = await stack.find({ name: name.toLowerCase() })
    if (!matchedStack.length) throw Error('No stack found under that name')
    await stack.deleteOne({ _id: matchedStack[0]._id })
    const response = await stack.find()
    res.status(200).json(response)
  } catch (error: any) {
    res.status(400).json('Error deleting stack: ' + error.message)
  }
})

// eslint-disable-next-line @typescript-eslint/no-misused-promises
stackRouter.put('/', async (req, res): Promise<void> => {
  try {
    const { name, edit } = req.body
    if (!name || !edit) throw Error("'name' and 'edit' are required for this route")
    if (typeof edit !== 'string') throw Error('Stack name only receives strings')
    const [matchedStack] = await stack.find({ name: name.toLowerCase() })
    if (!matchedStack) throw Error('No stack found under that name')
    matchedStack.name = edit
    await stack.findOneAndReplace({ _id: matchedStack._id }, matchedStack)
    const response = await stack.find()
    res.status(200).json(response)
  } catch (error: any) {
    res.status(400).json('Error editing stack: ' + error.message)
  }
})

export default stackRouter
