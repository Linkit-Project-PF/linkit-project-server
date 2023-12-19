import base from '../../../db/airtable'
import { ServerError, UncatchedError } from '../../../errors/errors'
import { type PostulationRepository } from '../../domain/postulation.repository'
import { validatePostulation } from '../../../errors/validation'
import { type PostulationQuery, type translatedResponse } from '../../../interfaces'

export class MongoPostulationRepository implements PostulationRepository {
  async createPostulation (postulation: any): Promise<translatedResponse> {
    try {
      validatePostulation(postulation)
      await base('LinkIT - Candidate application').create([
        {
          // fields: {

          // }
        }
      ])
      return { en: 'Postulation sent', es: 'Postulación enviada' }
    } catch (error: any) {
      if (error instanceof ServerError) throw error
      else throw new UncatchedError(error.message, 'creating postulation', 'crear postulacion')
    }
  }

  async findPostulation (query: PostulationQuery): Promise<any> {
    try {
      // TODO Return here an array with all postulations
      // base('LinkIT - Candidate application').select({
      //   Selecting the first 3 records in Grid view:
      //   maxRecords: 3,
      //   view: 'Grid view'
      // }).eachPage(function page (records, fetchNextPage) {
      //   This function (`page`) will get called for each page of records.

      //   records.forEach(function (record) {
      //     console.log('Retrieved', record.fields)
      //   })

      //   To fetch the next page of records, call `fetchNextPage`.
      //   If there are more records, `page` will get called again.
      //   If there are no more records, `done` will get called.
      //   fetchNextPage()
      // }, function done (err) {
      //   if (err) { console.error(err) }
      // })
      console.log(query)
      const filter = Object.keys(query)[0]
      const value = Object.values(query)[0]
      const airtable = await base('LinkIT - Candidate application').select({ view: 'Grid view' }).all()
      const fields = airtable.map(result => result.fields)
      let result
      if (!filter) {
        result = fields
      } else if (filter === 'user') {
        result = fields.filter(records => (records['Nombre completo'] as string).includes(value))
      } else throw new ServerError('Invalid filter parameter', 'Parametro de filtrado invalido', 406)
      return result
    } catch (error: any) {
      if (error instanceof ServerError) throw error
      else throw new UncatchedError(error.message, 'searching postulations', 'buscar postulaciones')
    }
  }
}
