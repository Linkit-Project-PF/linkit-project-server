import { type JdEntity } from '../../domain/jd.entity'
import { type JdRepository } from '../../domain/jd.repository'
import Jd from '../Collection/Jd'
import mongoDBConnect from '../../../db/mongo'

export class MongoJdRepository implements JdRepository {
  async createJD (jd: JdEntity): Promise<JdEntity | any> {
    try {
      console.log(jd)
      const jdCreated = await Jd.create(jd)

      return jdCreated
    } catch (error) {

    }
  }

  async findJD (
    id: string,
    title: string,
    createdDate: string,
    requisites: string,
    modality: string,
    location: string,
    schedule: string,
    stack: string): Promise<JdEntity | any> {
    try {
      const jd = await Jd.findById(id)
      return jd
    } catch (error) {
      return 'No fue posible encontrar la vacante'
    }
  }

  async editJD (_id: string, jd: JdEntity): Promise<JdEntity | any> {
    try {
      const editedJd = await Jd.findByIdAndUpdate(_id, jd)
      return editedJd
    } catch (error) {

    }
  }

  async deleteJD (id: string): Promise<string | any> {
    try {
      await mongoDBConnect()
      await Jd.updateOne(
        { id },
        { $set: { archived: true } }
      )
    } catch (error) {
      return 'Error al intentar archivar el jd'
    }
  }
}
