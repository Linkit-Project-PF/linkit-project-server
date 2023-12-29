import { type postulation, type PostulationQuery, type translatedResponse } from '../../interfaces'

export interface PostulationRepository {
  createPostulation: (postulation: postulation, userId: string) => Promise<translatedResponse>
  findPostulation: (query: PostulationQuery) => Promise<postulation[]>
}
