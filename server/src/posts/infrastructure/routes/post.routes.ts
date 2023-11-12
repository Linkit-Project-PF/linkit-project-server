import { Router } from 'express'
import { MongoPostRepository } from '../repository/Post.repository'
import { PostUseCase } from '../../aplication/postUseCase'
import { PostController } from '../controller/post.controller'

const postRoute = Router()

const mongoPostRepository = new MongoPostRepository()
const postUseCase = new PostUseCase(mongoPostRepository)
const postController = new PostController(postUseCase)

postRoute.post('/create', postController.postController)
postRoute.get('/get', postController.getController)
postRoute.put('/update/:id', postController.putController)
postRoute.delete('/delete', postController.deleteController)

export default postRoute
