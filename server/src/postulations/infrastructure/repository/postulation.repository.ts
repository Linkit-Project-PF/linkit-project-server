import base from '../../../db/airtable'
import { ServerError, UncatchedError } from '../../../errors/errors'
import { type PostulationRepository } from '../../domain/postulation.repository'
import { type MailNodeMailerProvider } from '../../../users/authentication/Infrastructure/nodemailer/nodeMailer'
import { validatePostulation } from '../../../errors/validation'
import { type postulation, type PostulationQuery } from '../../../interfaces'
import { type UserEntity, type MongoUser } from '../../../users/domain/user/user.entity'
import User from '../../../users/infrastructure/schema/User'
import { postulationMailCreate } from '../../../users/authentication/Infrastructure/nodemailer/postulationMail/postulationMail'
import Jd from '../../../posts/infrastructure/schema/Jd'

export class MongoPostulationRepository implements PostulationRepository {
  constructor (private readonly mailNodeMailerProvider: MailNodeMailerProvider) {
    this.mailNodeMailerProvider = mailNodeMailerProvider
  }

  async createPostulation (postulation: postulation, userId: string): Promise<UserEntity> {
    try {
      await validatePostulation(postulation, userId)
      postulation.created = new Date()
      const jd = await Jd.find({ code: postulation.code })
      const user = await User.findById(userId) as UserEntity
      const localCV = {
        id: postulation.cv, 
        url: `https://res.cloudinary.com/dquhriqz3/image/upload/v1713016359/${postulation.cv}.pdf`, 
        filename: 'filename',
        size: 1000,
        type: 'application/pdf' 
       }
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
            Nombre: postulation.firstName,
            Apellido: postulation.lastName,
            'What would be your area of expertise?': postulation.techStack,
            Recruiter: postulation.recruiter ? postulation.recruiter : undefined,
            'CV': localCV.url
          }
        }
      ])
      await User.findByIdAndUpdate(userId, { $push: { postulations: postulation.code } }, { new: true })
      if (jd.length) await this.mailNodeMailerProvider.sendEmail(postulationMailCreate(user as MongoUser, jd[0]))
      else throw new ServerError('Unable to find JD under the code provided', 'No se encontro JD con ese codigo', 406)
      return user
    } catch (error: any) {
      if (error instanceof ServerError) throw error
      else throw new UncatchedError(error.message, 'creating postulation', 'crear postulacion')
    }
  }

  async findPostulation (query: PostulationQuery): Promise<postulation[]> {
    try {
      const filter = Object.keys(query)[0]
      const value = Object.values(query)[0]
      const airtable = await base('LinkIT - Candidate application').select({ view: 'WebView' }).all()
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
