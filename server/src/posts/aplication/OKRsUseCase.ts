import { type OKRsEntity } from '../domain/OKRs/OKRs.entity'
import { type OKRsRepository } from '../domain/OKRs/OKRs.repository'
import { OKRsValue } from '../domain/OKRs/OKRs.value'

export class OKRsUseCase {
  constructor (private readonly OKRsRepository: OKRsRepository) {}

  public createOKR = async (OKR: OKRsEntity): Promise<OKRsEntity | string> => {
    const newOKR = new OKRsValue(OKR)
    const OKRCreated = await this.OKRsRepository.createOKR(newOKR)
    return OKRCreated
  }

  public findOKR = async (): Promise<OKRsEntity | string[]> => {
    const OKR = await this.OKRsRepository.findOKR()
    return OKR
  }

  public editOKR = async (_id: string | string[], OKR: OKRsEntity): Promise<OKRsEntity | string> => {
    const editedOKR = await this.OKRsRepository.editOKR(_id, OKR)
    return editedOKR
  }

  public deleteOKR = async (_id: string): Promise< string> => {
    const answer = await this.OKRsRepository.deleteOKR(_id)
    return answer
  }
}
