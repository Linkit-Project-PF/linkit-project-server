import { type PostulationQuery, type translatedResponse } from '../../interfaces'

export interface PostulationRepository {
  // TODO Define types here
  createPostulation: (postulation: any) => Promise<translatedResponse>
  findPostulation: (query: PostulationQuery) => Promise<any>
}
