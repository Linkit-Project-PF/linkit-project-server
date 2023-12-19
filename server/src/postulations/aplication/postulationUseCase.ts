import { type PostulationQuery, type translatedResponse } from '../../interfaces'
import { type PostulationRepository } from '../domain/postulation.repository'

export class PostulationUseCase {
  constructor (private readonly postulationRepo: PostulationRepository) { }

  // TODO Define types here
  public findPostulation = async (query: PostulationQuery): Promise<any> => {
    const postulation = await this.postulationRepo.findPostulation(query)
    return postulation
  }

  public createPostulation = async (postulation: any): Promise<translatedResponse> => {
    const postulationCreated = await this.postulationRepo.createPostulation(postulation)
    return postulationCreated
  }
}
