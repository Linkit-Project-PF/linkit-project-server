import { type PostulationRepository } from '../domain/postulation.repository'

// TODO Define types here

export class PostulationUseCase {
  constructor (private readonly postulationRepo: PostulationRepository) { }

  public findPostulation = async (filter: string, value: string): Promise<any> => {
    const postulation = await this.postulationRepo.findPostulation(filter, value)
    return postulation
  }

  public createPostulation = async (postulation: any): Promise<any> => {
    const postulationCreated = await this.postulationRepo.createPostulation(postulation)
    return postulationCreated
  }
}
