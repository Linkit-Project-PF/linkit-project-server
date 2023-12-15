import { type PostulationEntity } from './postulation.entity'

export class PostulationValue implements PostulationEntity {
  reason: string
  availability: string
  salary: number
  techStack: string[]
  stack: string[]
  recruiter: string
  jd: string[]
  user: string[]

  constructor (postulation: PostulationEntity) {
    this.reason = postulation.reason
    this.availability = postulation.availability
    this.salary = postulation.salary
    this.techStack = postulation.techStack
    this.stack = postulation.stack
    this.recruiter = postulation.recruiter
    this.jd = postulation.jd
    this.user = postulation.user
  }
}
