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

  public findPost = async (
    id: string, type: string, input: string, title: string, createdDate: string, link: string): Promise<PostEntity | string> => {
    const post = await this.PostRepository.findPost(id, type, input, title, createdDate, link)
    return post
  }

  public editPost = async (
    _id: string, post: PostEntity): Promise<PostEntity | null> => {
    const editedPost = await this.PostRepository.editPost(_id, post)
    return editedPost
  }

  public deletePost = async (
    id: string): Promise<string | null> => {
    const deletepost = await this.PostRepository.deletePost(id)
    return deletepost
  }
}
