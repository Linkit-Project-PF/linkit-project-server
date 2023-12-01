import { Router } from 'express'
import { authorize, listMajors } from '../helpers/googleSheets'

const googleRoute = Router()

// eslint-disable-next-line @typescript-eslint/no-misused-promises
googleRoute.get('/', async (_req, res) => {
  try {
    const auth = await authorize()
    const data = await listMajors(auth)
    res.json(data)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

export default googleRoute
