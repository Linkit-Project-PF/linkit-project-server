import { type JdEntity } from './jd.entity'

export interface JdRepository {
  createJD: (jd: JdEntity) => Promise<JdEntity | string>
  findJD: (value: string | string[], filter: string | string[], combined?: boolean) => Promise<JdEntity | JdEntity[]>
  editJD: (_id: string, jd: JdEntity) => Promise<JdEntity>
  deleteJD: (id: string) => Promise<JdEntity[]>
}
