import { Router } from 'express'
import base from '../../../db/airtable'
import { UncatchedError, type customError } from '../../../errors/errors'

const clientsFollowUpRoute = Router()

// eslint-disable-next-line @typescript-eslint/no-misused-promises
clientsFollowUpRoute.get('/', async (req, res): Promise<void> => {
  try {
    const airtable = await base('LinkIT - Clients Follow up').select({
      view: 'Grid view'
    }).all()
    const fields = airtable.map(result => result.fields)
    const filter = Object.keys(req.query)[0]
    const value = Object.values(req.query)[0] as string
    let result
    if (filter === 'company') {
      result = fields.filter(followUp => {
        if (followUp.Client) {
          return (followUp.Client as string).toLowerCase().includes(value.toLowerCase())
        } else return false
      })
    } else if (filter === 'code') {
      result = (fields.filter(followUp => followUp['Role Code'] === value)[0]
      )
    } else {
      result = fields
    }
    res.status(200).json(result)
  } catch (error: any) {
    const newError = new UncatchedError(error.message, 'requesting airtable info', 'requerir informacion de airtable')
    res.status(500).json(newError[(req as any).lang as keyof customError])
  }
})

export default clientsFollowUpRoute
