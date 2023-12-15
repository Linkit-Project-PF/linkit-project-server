import { type PostulationEntity } from './postulation.entity'

export interface PostulationRepository {
  createPostulation: (postulation: PostulationEntity) => Promise<PostulationEntity>
  findPostulation: () => Promise<PostulationEntity | PostulationEntity[]>
  updatePostulation: (id: string, postulation: PostulationEntity) => Promise<PostulationEntity>
  removePostulation: (id: string) => Promise<PostulationEntity>
}
