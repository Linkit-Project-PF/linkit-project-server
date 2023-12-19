import { Router } from 'express'
import base from '../../../db/airtable'
import { type translatedResponse } from '../../../interfaces'
import { UncatchedError, type customError } from '../../../errors/errors'

const clientsFollowUpRoute = Router()

// eslint-disable-next-line @typescript-eslint/no-misused-promises
clientsFollowUpRoute.get('/', async (req, res): Promise<any> => {
  try {
    await base('LinkIT - Recruiter candidate presentation').select({
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
    const newError = new UncatchedError(error.message, 'create a contact request', 'crear una peticion de contacto')
    console.log(error)
    res.status(500).json(newError[(req as any).lang as keyof customError])
    // const newError = new UncatchedError(error.message, 'Failed request', 'Requerimiento fallido')
    // res.status(500).json(newError[(req as any).lang as keyof customError])
  }
})

export default clientsFollowUpRoute
