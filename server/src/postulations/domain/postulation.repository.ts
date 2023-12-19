import { type translatedResponse } from '../../interfaces'

export interface PostulationRepository {
  // TODO Define types here
  createPostulation: (postulation: any) => Promise<translatedResponse>
  findPostulation: (filter: string, value: string) => Promise<any>
}
