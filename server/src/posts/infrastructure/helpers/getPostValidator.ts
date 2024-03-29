import { ServerError, UncatchedError } from '../../../errors/errors'
import { type PostUseCase } from '../../aplication/postUseCase'
import { type PostEntity } from '../../domain/post/post.entity'

interface PostQuery {
  id?: string
  title?: string
  type?: string
  archived?: string
}

export default async function getPostValidator (query: PostQuery, postUseCase: PostUseCase, lang: string): Promise<PostEntity | PostEntity[] | string> {
  try {
    let post
    if (Object.keys(query).length) {
      const filter: string = Object.keys(query)[0]
      const value: string = Object.values(query)[0]
      post = await postUseCase.findPost(value, filter)
    } else {
      post = await postUseCase.findPost('', 'all', lang)
    }
    return post as PostEntity[]
  } catch (error: any) {
    if (error instanceof ServerError) throw error
    else throw new UncatchedError(error.message, 'searching post', 'buscar publicacion')
  }
}
