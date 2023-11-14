export interface PostEntity {
  _id: string
  title: string
  image?: string | null
  description: string
  link?: string | null
  input: string
  modality?: string | null
  type?: string | null
  stack?: string[] | null
  location?: string | null
  archived?: boolean | null
}
