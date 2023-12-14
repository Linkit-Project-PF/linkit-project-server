import { type PostulationEntity } from '../domain/postulation.entity'
import { PostulationValue } from '../domain/postulation.value'
import { type PostulationRepository } from '../domain/postulation.repository'

export class PostulationUseCase {
  constructor(private readonly postulationRepo: PostulationRepository) { }

  public findPostulation = async (): Promise<PostulationEntity | PostulationEntity[]> => {
    const postulation = await this.postulationRepo.findPostulation()
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

  public removePostulation = async (id: string): Promise<PostulationEntity | string> => {
    const deletedPostulation = await this.postulationRepo.removePostulation(id)
    return deletedPostulation
  }
}
