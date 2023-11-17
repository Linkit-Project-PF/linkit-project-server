import { Router } from 'express'

const resourcesRoute = Router()

// eslint-disable-next-line @typescript-eslint/no-misused-promises
resourcesRoute.post('/contactus', async (req, res): Promise<void> => {
  try {
    const newContact = await req.body
    res.status(200).json(newContact)
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
})

export default resourcesRoute
