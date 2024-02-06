import { type JdEntity } from './jd.entity'

export interface JdRepository {
  createJD: (jd: JdEntity) => Promise<JdEntity | string>
  findJD: (value: string | string[], filter: string | string[], lang?: string, combined?: boolean) => Promise<JdEntity | JdEntity[]>
  editJD: (_id: string, jd: JdEntity) => Promise<JdEntity>
  deleteJD: (id: string, reqID?: string, total?: string) => Promise<JdEntity[]>
}
