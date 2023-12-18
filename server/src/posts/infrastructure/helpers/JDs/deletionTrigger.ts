import { ServerError, UncatchedError } from '../../../../errors/errors'
import { MongoPostulationRepository } from '../../../../postulations/infrastructure/repository/postulation.repository'
import { type JdEntity } from '../../../domain/jd/jd.entity'
import { RelateJD } from './relateJD'

export default async function totalDeletionTrigger (jd: JdEntity): Promise<void> {
  try {
    const provider = new MongoPostulationRepository()
    for (let i = 0; i < jd.users.length; i++) {
      await provider.deletePostulation(jd.users[i].toString(), 'true')
    }
    await RelateJD(jd, 'delete')
  } catch (error: any) {
    if (error instanceof ServerError) throw error
    else throw new UncatchedError(error.message, 'deleting JD relations', 'eliminar relaciones de vacante')
  }
}
