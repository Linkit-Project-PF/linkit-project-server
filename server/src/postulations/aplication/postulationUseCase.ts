import { type postulation, type PostulationQuery } from '../../interfaces'
import { type UserEntity } from '../../users/domain/user/user.entity'
import { type PostulationRepository } from '../domain/postulation.repository'

export class PostulationUseCase {
  constructor (private readonly postulationRepo: PostulationRepository) { }

  public findPostulation = async (query: PostulationQuery): Promise<postulation[]> => {
    const postulation = await this.postulationRepo.findPostulation(query)
    return postulation
  }

  public createPostulation = async (postulation: postulation, userId: string): Promise<UserEntity> => {
    const postulationCreated = await this.postulationRepo.createPostulation(postulation, userId)
    return postulationCreated
  }
}
