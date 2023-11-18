import { Router } from 'express'
import base from '../../../db/airtable'

const resourcesRoute = Router()

// eslint-disable-next-line @typescript-eslint/no-misused-promises
resourcesRoute.post('/contactus', async (req, res): Promise<any> => {
  try {
    const newContact = req.body
    // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
    base('Users').create([
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
    ], (err: any, records: any) => {
      if (err) {
        console.error(err)
        return
      }
      records.forEach((record: any): any => {
        console.log('Registro creado:', record.getId())
      })
    })
    res.status(200).send('Contacto creado')
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
})

export default resourcesRoute
