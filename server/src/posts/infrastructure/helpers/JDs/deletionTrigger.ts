import { ServerError, UncatchedError } from '../../../../errors/errors'
import Postulation from '../../../../postulations/infrastructure/schema/Postulation'
import { type JdEntity } from '../../../domain/jd/jd.entity'
import { RelateJD } from './relateJD'

export default async function totalDeletionTrigger (jd: JdEntity): Promise<void> {
  try {
    await RelateJD(jd, 'delete')
    for (let i = 0; jd.users.length; i++) {
      await Postulation.findByIdAndDelete(jd.users[i]) // TODO Here needs to be instatiated the delete of Postulations, that way It can delete the admins relation with followUp
    }
  } catch (error: any) {
    if (error instanceof ServerError) throw error
    else throw new UncatchedError(error.message, 'deleting JD', 'eliminar vacante')
  }
}
