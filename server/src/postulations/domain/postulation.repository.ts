import { type PostulationEntity } from './postulation.entity'

export interface PostulationRepository {
  createPostulation: (postulation: PostulationEntity) => Promise<PostulationEntity>
  findPostulation: (filter: string, value: string) => Promise<PostulationEntity | PostulationEntity[]>
  updatePostulation: (id: string, postulation: PostulationEntity) => Promise<PostulationEntity>
  deletePostulation: (id: string, total?: string) => Promise<PostulationEntity | string>
}
