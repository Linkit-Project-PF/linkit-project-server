export interface translatedResponse {
  en: string
  es: string
}

export interface PostulationQuery {
  user?: string
}

export interface postulation {
  code: string
  techStack: string[]
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
  recruiter?: string
}
