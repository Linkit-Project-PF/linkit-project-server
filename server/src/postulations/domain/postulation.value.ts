import { type Types } from 'mongoose'
import { type PostulationEntity } from './postulation.entity'

export class PostulationValue implements PostulationEntity {
  reason: string
  availability: string
  salary: number
  techStack: string[]
  stack: string[]
  jd: Types.ObjectId
  user: Types.ObjectId
  status: string
  followUps: Types.ObjectId[]

  constructor (postulation: PostulationEntity) {
    this.reason = postulation.reason
    this.availability = postulation.availability
    this.salary = postulation.salary
    this.techStack = postulation.techStack
    this.stack = postulation.stack
    this.jd = postulation.jd
    this.user = postulation.user
    this.status = postulation.status
    this.followUps = postulation.followUps
  }
}
