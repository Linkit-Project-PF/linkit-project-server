import { Router } from 'express'
import { MongoPostRepository } from '../repository/Post.repository'
import { PostUseCase } from '../../aplication/postUseCase'
import { PostController } from '../controller/post.controller'

const postRoute = Router()

const mongoPostRepository = new MongoPostRepository()
const postUseCase = new PostUseCase(mongoPostRepository)
const postController = new PostController(postUseCase)

postRoute.post('/createPost', postController.postPostController)
postRoute.get('/searchPost', postController.getPostController)
postRoute.put('/updatePost/:_id', postController.putPostController)
postRoute.delete('/deletePost/:id', postController.deletePostController)

export default postRoute
