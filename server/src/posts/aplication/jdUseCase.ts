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

  public findJD = async (value: string | string[], type: string | string[], lang?: string, combined?: boolean): Promise<JdEntity | JdEntity[] | string> => {
    const jd = await this.JdRepository.findJD(value, type, lang, combined)
    return jd
  }

  public editJD = async (_id: string, jd: JdEntity): Promise<JdEntity | string> => {
    const EditedJd = await this.JdRepository.editJD(_id, jd)
    return EditedJd
  }

  public deleteJD = async (id: string, reqID?: string, total?: string): Promise<JdEntity[]> => {
    const answer = await this.JdRepository.deleteJD(id, reqID, total)
    return answer
  }
}
