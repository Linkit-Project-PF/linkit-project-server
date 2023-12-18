import { type PostulationEntity } from '../domain/postulation.entity'
import { PostulationValue } from '../domain/postulation.value'
import { type PostulationRepository } from '../domain/postulation.repository'

export class PostulationUseCase {
  constructor (private readonly postulationRepo: PostulationRepository) { }

  public findPostulation = async (filter: string, value: string): Promise<PostulationEntity | PostulationEntity[]> => {
    const postulation = await this.postulationRepo.findPostulation(filter, value)
    return postulation
  }

  public createPostulation = async (postulation: PostulationEntity): Promise<PostulationEntity> => {
    const newPostulation = new PostulationValue(postulation)
    const postulationCreated = await this.postulationRepo.createPostulation(newPostulation)
    return postulationCreated
  }

  public updatePostulation = async (id: string, postulation: PostulationEntity): Promise<PostulationEntity> => {
    const editedPostulation = await this.postulationRepo.updatePostulation(id, postulation)
    return editedPostulation
  }

  public deletePostulation = async (id: string, total?: string): Promise<PostulationEntity | string> => {
    const deletedPostulation = await this.postulationRepo.deletePostulation(id, total)
    return deletedPostulation
  }
}
