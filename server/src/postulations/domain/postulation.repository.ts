import { type postulation, type PostulationQuery, type translatedResponse } from '../../interfaces'

export interface PostulationRepository {
  createPostulation: (postulation: postulation) => Promise<translatedResponse>
  findPostulation: (query: PostulationQuery) => Promise<postulation[]>
}
