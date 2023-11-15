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

  public findPostById = async (id: string): Promise<PostEntity | null> => {
    const post = await this.PostRepository.findPostById(id)
    return post
  }

  public findPostByType = async (type: string): Promise<PostEntity[] | string> => {
    const post = await this.PostRepository.findPostByType(type)
    return post
  }

  public findPostByTitle = async (title: string): Promise<PostEntity | null> => {
    const post = await this.PostRepository.findPostByTitle(title)
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
