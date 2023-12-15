import { ServerError, UncatchedError } from '../../../errors/errors'
import { type PostulationEntity } from '../../domain/postulation.entity'
import { type PostulationRepository } from '../../domain/postulation.repository'
import Postulation from '../schema/Postulation'

export class MongoPostulationRepository implements PostulationRepository {
  async createPostulation(postulation: PostulationEntity): Promise<PostulationEntity> {
    try {
      // TODO validators here: Validate props, validate ObjectID (use objectIDValidator) validate that user and Jd exists, validate that there is no another postulation with same user and jd
      const postulationCreated = await Postulation.create(postulation)
      return postulationCreated as unknown as PostulationEntity
    } catch (error: any) {
      if (error instanceof ServerError) throw error
      else throw new UncatchedError(error.message, 'creating postulation', 'crear postulacion')
    }
  }

  async findPostulation(): Promise<PostulationEntity | PostulationEntity[]> {
    // TODO validators here
    try {
      const postulationFound = Postulation.find({})
      return postulationFound as unknown as PostulationEntity[]
    } catch (error: any) {
      if (error instanceof ServerError) throw error
      else throw new UncatchedError(error.message, 'creating postulation', 'crear postulacion')
    }
  }

  async updatePostulation(_id: string, postulation: PostulationEntity): Promise<PostulationEntity> {
    try {
      const postulationFound = await Postulation.findByIdAndUpdate(_id, postulation, { new: true })
      return postulationFound as unknown as PostulationEntity
    } catch (error: any) {
      if (error instanceof ServerError) throw error
      else throw new UncatchedError(error.message, 'editing postulation', 'editar postulacion')
    }
  }

  async removePostulation(_id: string): Promise<PostulationEntity> {
    try {
      const postulation = await Postulation.findByIdAndDelete(_id)
      return postulation as unknown as PostulationEntity
    } catch (error: any) {
      if (error instanceof ServerError) throw error
      else throw new UncatchedError(error.message, 'editing postulation', 'editar postulacion')
    }
  }
}
