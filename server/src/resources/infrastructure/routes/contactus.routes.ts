import { Router } from 'express'
import base from '../../../db/airtable'
import { type translatedResponse } from '../../../interfaces'
import { UncatchedError, type customError } from '../../../errors/errors'

const contactUsRoute = Router()

// eslint-disable-next-line @typescript-eslint/no-misused-promises
contactUsRoute.post('/', async (req, res): Promise<any> => {
  try {
    const newContact = req.body
    await base('Contactos').create([
      {
        fields: {
          Nombre: newContact.firstName,
          Apellido: newContact.lastName,
          Empresa: newContact.company,
          '¿Qué servicio te interesa?': newContact.service,
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

// eslint-disable-next-line @typescript-eslint/no-misused-promises
contactUsRoute.get('/services', async (req, res): Promise<any> => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
    const tableName = 'Contactos'

    // Propiedad que deseas mapear
    const propertyName = '¿Qué servicio te interesa?'

    // Array para almacenar los valores mapeados

    const uniqueValues = new Set()

    // Consultar la tabla en Airtable y mapear la propiedad específica
    base(tableName).select({
      view: 'Grid view' // Puedes cambiar esto según tu vista
    }).eachPage((records, fetchNextPage) => {
      // Procesar cada registro y agregar el valor de la propiedad al set
      records.forEach((record) => {
        const propertyValue = record.get(propertyName)
        uniqueValues.add(propertyValue)
      })

      // Obtener la siguiente página de registros
      fetchNextPage()
    }, (err) => {
      if (err) {
        console.error(err)
        return
      }

      // Convertir el set a un array para trabajar con los valores
      const uniqueValuesArray = Array.from(uniqueValues)

      // Imprimir o hacer algo con los valores únicos
      console.log(uniqueValuesArray)
    })
    res.status(200).json(uniqueValues)
  } catch (error: any) {
    const newError = new UncatchedError(error.message, 'create a contact request', 'crear una peticion de contacto')
    res.status(500).json(newError[(req as any).lang as keyof customError])
  }
})

export default contactUsRoute
