import { type JdEntity } from '../domain/jd/jd.entity'
import { type JdRepository } from '../domain/jd/jd.repository'
import { JdValue } from '../domain/jd/jd.value'

export class JdUseCase {
  constructor (private readonly JdRepository: JdRepository) {}

  public createJD = async (jd: JdEntity): Promise<JdEntity | string> => {
    const newJd = new JdValue(jd)
    const jdCreated = await this.JdRepository.createJD(newJd)
    return jdCreated
  }

  public findJD = async (value: string | string[], type: string | string[], combined?: boolean): Promise<JdEntity | JdEntity[] | string> => {
    const jd = await this.JdRepository.findJD(value, type, combined)
    return jd
  }

  public editJD = async (_id: string, jd: JdEntity): Promise<JdEntity | string> => {
    const EditedJd = await this.JdRepository.editJD(_id, jd)
    return EditedJd
  }

  public deleteJD = async (id: string): Promise<JdEntity[] | string> => {
    const answer = await this.JdRepository.deleteJD(id)
    return answer
  }

  public relateUser = async (jdID: string, userid: string, status: string, operation: string): Promise<JdEntity> => {
    const answer = await this.JdRepository.relateUser(jdID, userid, status, operation)
    return answer
  }
}
