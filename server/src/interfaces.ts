export interface translatedResponse {
  en: string
  es: string
}

export interface PostulationQuery {
  user?: string
}

export interface postulation {
  cv: string
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

export interface cv {
  fileName?: string | null | undefined
  cloudinaryId?: string | null | undefined
}

export interface blogHeader {
  head?: string | null
  body?: string | null
  sectionImage?: string | null
}
