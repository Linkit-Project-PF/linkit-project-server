import { Router } from 'express'
import { MongoPostRepository } from '../repository/Post.repository'
import { PostUseCase } from '../../aplication/postUseCase'
import { PostController } from '../controller/post.controller'
import { authValidator } from '../../../middlewares'

const postRoute = Router()

const mongoPostRepository = new MongoPostRepository()
const postUseCase = new PostUseCase(mongoPostRepository)
const postController = new PostController(postUseCase)

postRoute.use(authValidator)

postRoute.post('/create', postController.postController)
postRoute.get('/find', postController.getController)
postRoute.put('/update/:_id', postController.putController)
postRoute.delete('/delete/:id', postController.deleteController)

export default postRoute
