import { ServerError } from '../../../../errors/errors'
import { type PostUseCase } from '../../../aplication/postUseCase'
import { type PostEntity } from '../../../domain/post/post.entity'

interface PostQuery {
  id?: string
  title?: string
  type?: string
  archived?: string
}

export default async function getPostValidator (query: PostQuery, postUseCase: PostUseCase): Promise<PostEntity | PostEntity[] | string> {
  try {
    let post
    if (Object.keys(query).length) {
      const filter: string = Object.keys(query)[0]
      const value: string = Object.values(query)[0]
      post = await postUseCase.findPost(value, filter)
    } else {
      post = await postUseCase.findPost('', 'all')
    }
    return post as PostEntity[]
  } catch (error: any) {
    throw new ServerError('searching post with filters', 'buscar el post con filtros', 400)
  }
}
