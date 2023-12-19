import base from '../../../db/airtable'
import { ServerError, UncatchedError } from '../../../errors/errors'
import { type PostulationRepository } from '../../domain/postulation.repository'
import { validatePostulation } from '../../../errors/validation'

// TODO Return an object {en, es} and response will depend on lang on controller
// For this create an interface

export class MongoPostulationRepository implements PostulationRepository {
  async createPostulation (postulation: any): Promise<string> {
    try {
      validatePostulation(postulation)
      await base('LinkIT - Candidate application').create([
        {
          // fields: {

          // }
        }
      ])

      return 'Postulation has been created'
    } catch (error: any) {
      if (error instanceof ServerError) throw error
      else throw new UncatchedError(error.message, 'creating postulation', 'crear postulacion')
    }
  }

  async findPostulation (filter: string, value: string): Promise<any> {
    try {
      base('LinkIT - Candidate application').select({
        // Selecting the first 3 records in Grid view:
        maxRecords: 3,
        view: 'Grid view'
      }).eachPage(function page (records, fetchNextPage) {
        // This function (`page`) will get called for each page of records.

        records.forEach(function (record) {
          console.log('Retrieved', record.fields)
        })

        // To fetch the next page of records, call `fetchNextPage`.
        // If there are more records, `page` will get called again.
        // If there are no more records, `done` will get called.
        fetchNextPage()
      }, function done (err) {
        if (err) { console.error(err) }
      })
    } catch (error: any) {
      if (error instanceof ServerError) throw error
      else throw new UncatchedError(error.message, 'creating postulation', 'crear postulacion')
    }
  }
}
