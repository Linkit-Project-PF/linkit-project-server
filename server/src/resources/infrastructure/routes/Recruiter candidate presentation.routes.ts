import { Router } from 'express'
import base from '../../../db/airtable'
import { type translatedResponse } from '../../../interfaces'
import { UncatchedError, type customError } from '../../../errors/errors'

const candidatePrsentationRoute = Router()

// eslint-disable-next-line @typescript-eslint/no-misused-promises
candidatePrsentationRoute.get('/', async (req, res): Promise<any> => {
  try {
    await base('LinkIT - Clients Follow up').select({
      view: 'Grid view'
    }).eachPage(
      function page (records, fetchNextPage) {
        records.forEach(function (record) {
          const data = record.fields
          console.log(data)
        })
        fetchNextPage()
      }
    )
    const response: translatedResponse = { en: 'successful request', es: 'Peticion exitosa' }
    res.status(200).send(response[(req as any).lang as keyof translatedResponse])
  } catch (error: any) {
    const newError = new UncatchedError(error.message, 'Failed request', 'Requerimiento fallido')
    res.status(500).json(newError[(req as any).lang as keyof customError])
  }
})

export default candidatePrsentationRoute
