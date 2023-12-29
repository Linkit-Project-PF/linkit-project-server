export interface translatedResponse {
  en: string
  es: string
}

export interface PostulationQuery {
  user?: string
}

// TODO Create postulation interface here to define find postulations type
export interface postulation {
  code: string
  stack: string[]
  email: string
  country: string
  linkedin: string
  salary: number
  english: string
  reason: string
  availability: string
  created: Date
  firstName: string
  lastName: string
}
