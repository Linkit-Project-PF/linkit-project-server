import { type JdEntity } from './jd.entity'

export interface JdRepository {
  createJD: (jd: JdEntity) => Promise<JdEntity | string>
  findJD: (id: string, title: string, createdDate: string, requisites: string[] | undefined, modality: string, location: string, schedule: string, stack: string[] | undefined) => Promise<JdEntity | any>
  editJD: (_id: string, jd: JdEntity) => Promise<JdEntity | string>//! _id de mongo
  deleteJD: (id: string) => Promise<string | null>
}
