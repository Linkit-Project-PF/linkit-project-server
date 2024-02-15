import { type PostEntity } from '../../domain/post/post.entity'
import * as deepl from 'deepl-node'

const authkey = 'd16645db-ee0a-4af1-87dd-d0417ffee3d3:fx'
const translator = new deepl.Translator(authkey)

async function trasnlateEach (Post: PostEntity): Promise<PostEntity> {
  Post.title = (await translator.translateText(Post.title, null, 'en-US')).text
  Post.description = (await translator.translateText(Post.description, 'es', 'en-US')).text
  for (let i = 0; i < Post.headers.length; i++) {
    Post.headers[i].head = Post.headers[i].head
      ? (await translator.translateText(Post.headers[i].head as string, null, 'en-US')).text
      : undefined
    Post.headers[i].body = Post.headers[i].body
      ? (await translator.translateText(Post.headers[i].body as string, null, 'en-US')).text
      : undefined
  }
  return Post
}
export async function PostTranslation (Posts: PostEntity[]): Promise<PostEntity[]> {
  for (let i = 0; i < Posts.length; i++) {
    await trasnlateEach(Posts[i])
  }
  return Posts
}
