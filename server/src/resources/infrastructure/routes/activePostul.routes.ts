import { Router } from 'express'
import base from '../../../db/airtable'
import { UncatchedError, type customError } from '../../../errors/errors'

const candidatePrsentationRoute = Router()

// eslint-disable-next-line @typescript-eslint/no-misused-promises
candidatePrsentationRoute.get('/', async (req, res): Promise<any> => {
  try {
    const airtable = await base('LinkIT - Recruiter candidate presentation').select({
      view: 'Grid view'
    }).all()
    const result = airtable.map(result => result.fields)
    res.status(200).json(result)
  } catch (error: any) {
    const newError = new UncatchedError(error.message, 'requesting airtable info', 'requerir informacion de airtable')
    res.status(500).json(newError[(req as any).lang as keyof customError])
  }
})

export default candidatePrsentationRoute
