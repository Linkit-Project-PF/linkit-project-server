import { type Types } from 'mongoose'

export interface PostulationEntity {
  reason: string
  availability: string
  salary: number
  techStack: string[]
  stack: string[]
  jd: Types.ObjectId
  user: Types.ObjectId
  status: string
  followUps: Types.ObjectId[]
}
