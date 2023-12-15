import { ServerError, UncatchedError } from '../../../errors/errors'
import { type PostulationUseCase } from '../../aplication/postulationUseCase'
import { type PostulationEntity } from '../../domain/postulation.entity'

interface PostulationQuery {
  user?: string
  recruiter?: string
}

export default async function getPostulationValidator (query: PostulationQuery, postUseCase: PostulationUseCase): Promise<PostulationEntity | PostulationEntity[]> {
  try {
    let postulation: PostulationEntity | PostulationEntity[]
    const filters: string[] = Object.keys(query)
    const values: string[] = Object.values(query)
    if (filters.length) {
      postulation = await postUseCase.findPostulation(filters[0], values[0])
    } else {
      postulation = await postUseCase.findPostulation('all', '')
    }
    return postulation
  } catch (error: any) {
    if (error instanceof ServerError) throw error
    else throw new UncatchedError(error.message, 'searching user', 'buscar usuario')
  }
}
