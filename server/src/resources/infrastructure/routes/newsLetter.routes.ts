import { Router } from 'express'
import base from '../../../db/airtable'
import { type translatedResponse } from '../../../interfaces'
import { UncatchedError, type customError } from '../../../errors/errors'

const newsLetterRouter = Router()

// eslint-disable-next-line @typescript-eslint/no-misused-promises
newsLetterRouter.post('/', async (req, res): Promise<any> => {
  try {
    const user = req.body
    await base('Newsletter').create([
      {
        fields: {
          Nombre: user.name,
          Apellido: user.lastName,
          Email: user.email,
          'Soy Empresa / Soy Talento': user.info
        }
      }
    ])
    const response: translatedResponse = { en: 'Your information has been sent successfully', es: 'Tu informacion ha sido enviada con exito' }
    res.status(200).send(response[(req as any).lang as keyof translatedResponse])
  } catch (error: any) {
    const newError = new UncatchedError(error.message, 'create a contact request', 'crear una peticion de contacto')
    res.status(500).json(newError[(req as any).lang as keyof customError])
  }
})

export default newsLetterRouter
