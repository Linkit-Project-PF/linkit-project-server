import { Router } from 'express'
import base from '../../../db/airtable'
import { type translatedResponse } from '../../../interfaces'
import { UncatchedError, type customError } from '../../../errors/errors'

const contactUsRoute = Router()

// eslint-disable-next-line @typescript-eslint/no-misused-promises
contactUsRoute.post('/', async (req, res): Promise<any> => {
  try {
    const newContact = req.body
    await base('Contactanos').create([
      {
        fields: {
          Nombre: newContact.name,
          Apellido: newContact.lastName,
          Empresa: newContact.company,
          Servicio: newContact.service,
          Email: newContact.email,
          Mensaje: newContact.message
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

export default contactUsRoute
