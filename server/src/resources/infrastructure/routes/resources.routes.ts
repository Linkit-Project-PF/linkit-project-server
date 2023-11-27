import { Router } from 'express'
import base from '../../../db/airtable'

const resourcesRoute = Router()

// eslint-disable-next-line @typescript-eslint/no-misused-promises
resourcesRoute.post('/contactus', async (req, res): Promise<any> => {
  try {
    const newContact = req.body
    await base('UsersInfo').create([
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
    res.status(200).send('Contacto creado correctamente')
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
})

export default resourcesRoute
