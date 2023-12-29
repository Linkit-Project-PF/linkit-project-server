import base from '../../../db/airtable'
import { ServerError, UncatchedError } from '../../../errors/errors'
import { type PostulationRepository } from '../../domain/postulation.repository'
import { validatePostulation } from '../../../errors/validation'
import { type postulation, type PostulationQuery, type translatedResponse } from '../../../interfaces'
import User from '../../../users/infrastructure/schema/User'

export class MongoPostulationRepository implements PostulationRepository {
  async createPostulation (postulation: postulation, userId: string): Promise<translatedResponse> {
    try {
      // TODO Add CV from cloudinary, check with front ppl how they storage that.
      // TODO Check ALL postulations from Airtable to validate If user has already created a postulation for that JD, return error If so.
      await validatePostulation(postulation, userId)
      postulation.created = new Date()
      await base('LinkIT - Candidate application').create([
        {
          fields: {
            'Candidate Stack + PM tools': postulation.stack,
            LinkedIn: postulation.linkedin,
            'Salary expectation (USD)': postulation.salary,
            Country: postulation.country,
            'English Level': postulation.english,
            'Why Change': postulation.reason,
            'Candidate Email': postulation.email,
            'When to start availability': postulation.availability,
            Created: postulation.created.toLocaleDateString('en-CA', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '-'),
            Nombre: postulation.firstName,
            Apellido: postulation.lastName
          }
        }
      ])
      const sample = await User.findByIdAndUpdate(userId, { $push: { postulations: postulation.code } }, { new: true })
      console.log(sample, postulation.code)
      return { en: 'Postulation sent', es: 'Postulación enviada' }
    } catch (error: any) {
      if (error instanceof ServerError) throw error
      else throw new UncatchedError(error.message, 'creating postulation', 'crear postulacion')
    }
  }

  async findPostulation (query: PostulationQuery): Promise<postulation[]> {
    try {
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
      return result as unknown as postulation[]
    } catch (error: any) {
      if (error instanceof ServerError) throw error
      else throw new UncatchedError(error.message, 'searching postulations', 'buscar postulaciones')
    }
  }
}
