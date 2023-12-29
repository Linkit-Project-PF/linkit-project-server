import { type postulation, type PostulationQuery, type translatedResponse } from '../../interfaces'
import { type PostulationRepository } from '../domain/postulation.repository'

export class PostulationUseCase {
  constructor (private readonly postulationRepo: PostulationRepository) { }

  public findPostulation = async (query: PostulationQuery): Promise<postulation[]> => {
    const postulation = await this.postulationRepo.findPostulation(query)
    return postulation
  }

  public createPostulation = async (postulation: postulation, userId: string): Promise<translatedResponse> => {
    const postulationCreated = await this.postulationRepo.createPostulation(postulation, userId)
    return postulationCreated
  }
}
