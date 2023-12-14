import { type PostulationEntity } from './postulation.entity'

export interface PostulationRepository {
  create: (postulation: PostulationEntity) => Promise<PostulationEntity>
  findAll: () => Promise<PostulationEntity[]>
  findOne: (id: number) => Promise<PostulationEntity>
  update: (id: number, postulation: PostulationEntity) => Promise<PostulationEntity>
  remove: (id: number) => Promise<void>
  findByCode: (code: string) => Promise<PostulationEntity>
}
