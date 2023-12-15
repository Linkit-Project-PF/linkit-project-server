import mongoose from 'mongoose'
import { ServerError, UncatchedError } from '../../../errors/errors'
import { validatePostulation } from '../../../errors/validation'
import { objectIDValidator } from '../../../users/infrastructure/helpers/validateObjectID'
import { type PostulationEntity } from '../../domain/postulation.entity'
import { type PostulationRepository } from '../../domain/postulation.repository'
import { relatePostulation } from '../helpers/relatePostulations'
import Postulation from '../schema/Postulation'

export class MongoPostulationRepository implements PostulationRepository {
  async createPostulation (postulation: PostulationEntity): Promise<PostulationEntity> {
    try {
      await validatePostulation(postulation)
      const postulationCreated = await Postulation.create(postulation)
      await relatePostulation(postulationCreated._id.toString(), postulation.user, postulation.jd)
      return postulationCreated as unknown as PostulationEntity
    } catch (error: any) {
      if (error instanceof ServerError) throw error
      else throw new UncatchedError(error.message, 'creating postulation', 'crear postulacion')
    }
  }

  async findPostulation (filter: string, value: string): Promise<PostulationEntity | PostulationEntity[]> {
    // TODO validators here
    try {
      let result: PostulationEntity | PostulationEntity[]
      if (filter === 'user') {
        objectIDValidator(value, 'postulation user', 'usuario en postulacion')
        const userID = new mongoose.Types.ObjectId(value)
        result = await Postulation.find({ user: { $in: [userID] } }).populate('jd')
        return result
      } else if (filter === 'all') {
        result = await Postulation.find({})
      } else if (filter === 'jd') {
        objectIDValidator(value, 'postulation jd', 'vacante en postulacion')
        const jdID = new mongoose.Types.ObjectId(value)
        result = await Postulation.find({ jd: { $in: [jdID] } }).populate('user')
      } else if (filter === 'id') {
        objectIDValidator(value, 'postulation id', 'ID de postulacion')
        result = await Postulation.findById(value) as PostulationEntity
      } else throw new ServerError('Invalid filter', 'Filtro invalido', 403)
      return result
    } catch (error: any) {
      if (error instanceof ServerError) throw error
      else throw new UncatchedError(error.message, 'creating postulation', 'crear postulacion')
    }
  }

  async updatePostulation (_id: string, postulation: PostulationEntity): Promise<PostulationEntity> {
    try {
      const postulationFound = await Postulation.findByIdAndUpdate(_id, postulation, { new: true })
      return postulationFound as unknown as PostulationEntity
    } catch (error: any) {
      if (error instanceof ServerError) throw error
      else throw new UncatchedError(error.message, 'editing postulation', 'editar postulacion')
    }
  }

  async removePostulation (_id: string): Promise<PostulationEntity> {
    try {
      const postulation = await Postulation.findByIdAndDelete(_id)
      return postulation as unknown as PostulationEntity
    } catch (error: any) {
      if (error instanceof ServerError) throw error
      else throw new UncatchedError(error.message, 'editing postulation', 'editar postulacion')
    }
  }
}
