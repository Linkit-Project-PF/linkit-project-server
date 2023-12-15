import { type Types } from 'mongoose'
import { type JdEntity } from './jd.entity'

export class JdValue implements JdEntity {
  code: string
  title: string
  description: string
  type: 'full-time' | 'part-time' | 'freelance'
  location: string
  modality: 'remote' | 'specific-remote' | 'on-site' | 'hybrid'
  stack: string[]
  aboutUs?: string | null
  aboutClient?: string | null
  responsabilities?: string | null
  requirements: string[]
  niceToHave?: string[] | null
  benefits: string[]
  recruiter: Types.ObjectId[]
  archived: boolean
  company: Types.ObjectId
  status: string
  users: Types.ObjectId[]
  createdDate: Date

  constructor (jd: JdEntity) {
    // this.airTableId = jd.airTableId ?? undefined
    this.code = jd.code
    this.title = jd.title
    this.description = jd.description
    this.type = jd.type
    this.location = jd.location
    this.modality = jd.modality
    this.stack = jd.stack
    this.aboutUs = jd.aboutUs ?? undefined
    this.aboutClient = jd.aboutClient ?? undefined
    this.responsabilities = jd.responsabilities ?? undefined
    this.requirements = jd.requirements
    this.niceToHave = jd.niceToHave ?? []
    this.benefits = jd.benefits
    this.recruiter = jd.recruiter
    this.archived = jd.archived
    this.company = jd.company
    this.status = jd.status
    this.users = jd.users
    this.createdDate = jd.createdDate
  }
}
