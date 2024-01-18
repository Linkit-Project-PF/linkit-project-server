import { type blogHeader } from '../../../interfaces'

export interface PostEntity {
  title: string
  description: string
  headers: blogHeader[]
  createdDate: Date
  image?: string | null
  link?: string | null
  type: string
  archived?: boolean | null
  category: string
  createdBy: string
}
