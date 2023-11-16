import { type JdEntity } from '../../domain/jd.entity'
import { type JdRepository } from '../../domain/jd.repository'
import Jd from '../Collection/Jd'

export class MongoPostRepository implements JdRepository {
  async createJD (jd: JdEntity): Promise<JdEntity | string> {
    try {
      const jdCreated = await Jd.create(jd)
      return jdCreated
    } catch (error) {

    }
  }
}
