import { type JdEntity } from './jd.entity'

export interface JdRepository {
  createJD: (jd: JdEntity) => Promise<JdEntity | string>
  findJD: (value: string, filter: string) => Promise<JdEntity | JdEntity[] | string>
  editJD: (_id: string, jd: JdEntity) => Promise<JdEntity | string>//! _id de mongo
  deleteJD: (id: string) => Promise<JdEntity | string>
}
