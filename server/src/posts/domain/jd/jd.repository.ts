import { type JdEntity } from './jd.entity'

export interface JdRepository {
  createJD: (jd: JdEntity) => Promise<JdEntity | string>
  findJD: (value: string | string[], filter: string | string[], combined?: boolean) => Promise<JdEntity | JdEntity[] | string>
  editJD: (_id: string, jd: JdEntity) => Promise<JdEntity | string>
  deleteJD: (id: string) => Promise<JdEntity[] | string>
}
