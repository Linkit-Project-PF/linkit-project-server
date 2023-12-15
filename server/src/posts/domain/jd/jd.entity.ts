import { type Types } from 'mongoose'

export interface JdEntity {
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
}
