import { type postulation, type PostulationQuery } from '../../interfaces'
import { type UserEntity } from '../../users/domain/user/user.entity'

export interface PostulationRepository {
  createPostulation: (postulation: postulation, userId: string) => Promise<UserEntity>
  findPostulation: (query: PostulationQuery) => Promise<postulation[]>
}
