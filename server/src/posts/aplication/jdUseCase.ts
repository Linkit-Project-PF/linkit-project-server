import { type JdEntity } from '../domain/jd/jd.entity'
import { type JdRepository } from '../domain/jd/jd.repository'
import { JdValue } from '../domain/jd/jd.value'

export class JdUseCase {
  constructor (private readonly JdRepository: JdRepository) {}

  public createJD = async (
    jd: JdEntity
  ): Promise<JdEntity | string> => {
    const newJd = new JdValue(jd)
    const jdCreated = await this.JdRepository.createJD(newJd)
    return jdCreated
  }

  public findJD = async (
    id: string, title: string, createdDate: string, requisites: string, modality: string, location: string, schedule: string, stack: string
  ): Promise<JdEntity | any> => {
    const jd = await this.JdRepository.findJD(id, title, createdDate, requisites, modality, location, schedule, stack)
    return jd
  }

  public editJD = async (
    _id: string, jd: JdEntity
  ): Promise<JdEntity | string> => {
    const EditedJd = await this.JdRepository.editJD(_id, jd)
    return EditedJd
  }

  public deleteJD = async (
    id: string
  ): Promise<string | null> => {
    const answer = await this.JdRepository.deleteJD(id)
    return answer
  }
}
