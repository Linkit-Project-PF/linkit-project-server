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
      await relatePostulation(postulationCreated, 'create')
      return postulationCreated
    } catch (error: any) {
      if (error instanceof ServerError) throw error
      else throw new UncatchedError(error.message, 'creating postulation', 'crear postulacion')
    }
  }

  async findPostulation (filter: string, value: string): Promise<PostulationEntity | PostulationEntity[]> {
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
      objectIDValidator(_id, 'postulation to edit', 'postulacion a editar')
      const validParams = ['status', 'followUps']
      Object.keys(postulation).forEach(param => {
        if (!validParams.includes(param)) {
          throw new ServerError(
            'Invalid param, only status or followUps can be edited', 'Parametro invalido, solo el estado o los reclutadores pueden ser editados', 403
          )
        }
      })
      const postulationFound = await Postulation.findByIdAndUpdate(_id, postulation, { new: true })
      if (!postulationFound) throw new ServerError('No postulation found under that ID', 'No se encontro postulacion con ese ID', 404)
      return postulationFound
    } catch (error: any) {
      if (error instanceof ServerError) throw error
      else throw new UncatchedError(error.message, 'editing postulation', 'editar postulacion')
    }
  }

  async deletePostulation (_id: string, total?: string): Promise<PostulationEntity | string> {
    try {
      objectIDValidator(_id, 'postulation to delete', 'postulacion a eliminar')
      const postulation = await Postulation.findById(_id) as PostulationEntity
      if (!postulation) throw new ServerError('No postulation found under that ID', 'No se encontro postulacion con ese ID', 404)
      if (!total || total === 'false') {
        console.log(postulation.archived)
        const result = await Postulation.findByIdAndUpdate(_id, { archived: !postulation.archived }) as PostulationEntity
        return result
      } else if (total === 'true') {
        await relatePostulation(postulation, 'delete')
        await Postulation.findByIdAndDelete(_id)
      }
      return 'Postulation deleted successfully'
    } catch (error: any) {
      if (error instanceof ServerError) throw error
      else throw new UncatchedError(error.message, 'editing postulation', 'editar postulacion')
    }
  }
}
