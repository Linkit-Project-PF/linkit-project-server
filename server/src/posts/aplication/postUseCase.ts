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

  public findPostById = async (uuid: string): Promise<PostEntity | null> => {
    const post = await this.PostRepository.findPostById(uuid)
    return post
  }

  public deletePost = async (uuid: string): Promise<boolean | null> => {
    const post = await this.PostRepository.deletePost(uuid)
    return post
  }

  public editPost = async (post: PostEntity): Promise<PostEntity | null> => {
    const editPost = await this.PostRepository.editPost(post)
    return editPost
  }
}
