import { type PostulationEntity } from './postulation.entity'

export class PostulationValue implements PostulationEntity {
  name: string
  lastname: string
  cv: string
  email: string
  linkedin: string
  country: string
  elghislevel: string
  salary: number
  searchreasons: string
  noticeperiod: string
  techstack: string[]
  recruiter: string
  rol: string
  code: string

  constructor(postulation: PostulationEntity) {
    this.name = postulation.name
    this.lastname = postulation.lastname
    this.cv = postulation.cv
    this.email = postulation.email
    this.linkedin = postulation.linkedin
    this.country = postulation.country
    this.elghislevel = postulation.elghislevel
    this.salary = postulation.salary
    this.searchreasons = postulation.searchreasons
    this.noticeperiod = postulation.noticeperiod
    this.techstack = postulation.techstack
    this.recruiter = postulation.recruiter
    this.rol = postulation.rol
    this.code = postulation.code
  }
}
