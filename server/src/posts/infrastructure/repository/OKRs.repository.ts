import { type OKRsEntity } from '../../domain/OKRs/OKRs.entity'
import { type OKRsRepository } from '../../domain/OKRs/OKRs.repository'
import OKRs from '../schema/OKRs'
import { ValidateOKRsCreate } from '../../../errors/validation'
import { ServerError, UncatchedError } from '../../../errors/errors'

export class MongoOKRsRepository implements OKRsRepository {
  async createOKR (OKR: OKRsEntity): Promise<OKRsEntity | string> {
    try {
      await ValidateOKRsCreate(OKR)
      const OKRCreated = await OKRs.create(OKR)
      return OKRCreated as OKRsEntity
    } catch (error: any) {
      if (error instanceof ServerError) throw error
      else throw new UncatchedError(error.message, 'creating OKR', 'crear OKR')
    }
  }

  async findOKR (): Promise <OKRsEntity | string[] | any > {
    try {
      const result = await OKRs.find()
      return result
    } catch (error: any) {
      if (error instanceof ServerError) throw error
      else throw new UncatchedError(error.message, 'searching OKRs', 'Buscar OKRs')
    }
  }

  async editOKR (_id: string | string[], OKR: OKRsEntity): Promise <any> {
    try {
      const OKREdited = await OKRs.findByIdAndUpdate(_id, OKR, { new: true })
      if (OKREdited) return OKREdited as OKRsEntity
      else throw new ServerError('OKR not found', 'OKR no encontrado', 404)
    } catch (error: any) {
      if (error instanceof ServerError) throw error
      else throw new UncatchedError(error.message, 'editing OKR', 'editar OKR')
    }
  }

  async deleteOKR (_id: string | string[]): Promise <any> {
    try {
      const OKR = await OKRs.findById(_id)
      if (OKR) await OKRs.findByIdAndUpdate(_id, { archived: !OKR.archived }, { new: true })
      return 'OKR eliminado'
    } catch (error: any) {
      if (error instanceof ServerError) throw error
      else throw new UncatchedError(error.message, 'deleting OKR', 'eliminar OKR')
    }
  }
}
