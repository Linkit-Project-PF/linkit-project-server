import { type PostEntity } from '../domain/post.entity'
import { type PostRepository } from '../domain/post.repository'
import { PostValue } from '../domain/post.value'

export class PostUseCase {
  constructor (private readonly PostRepository: PostRepository) {}

  public createPost = async (
    post: PostEntity
  ): Promise<PostEntity | string> => {
    const newPost = new PostValue(post)
    const PostCreated = await this.PostRepository.createPost(newPost)
    return PostCreated
  }

  public findPost = async (type: string, id?: string): Promise<PostEntity[] | string> => {
    const post = await this.PostRepository.findPost(type, id)
    return post
  }

  public deletePost = async (_id: string): Promise<any> => {
    const deletepost = await this.PostRepository.deletePost(_id)
    return deletepost
  }

  public editPost = async (id: string, post: PostEntity): Promise<PostEntity | null> => {
    const editPost = await this.PostRepository.editPost(id, post)
    return editPost
  }
}
