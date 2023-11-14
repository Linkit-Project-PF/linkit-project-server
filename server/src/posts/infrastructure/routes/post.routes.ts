import { Router } from 'express'
import { MongoPostRepository } from '../repository/Post.repository'
import { PostUseCase } from '../../aplication/postUseCase'
import { PostController } from '../controller/post.controller'

const postRoute = Router()

const mongoPostRepository = new MongoPostRepository()
const postUseCase = new PostUseCase(mongoPostRepository)
const postController = new PostController(postUseCase)

postRoute.get('/type', postController.getTypeController)
postRoute.get('/:id', postController.getIdController)
postRoute.get('/title', postController.getTitleController)
postRoute.post('/create', postController.postController)
postRoute.put('/update/:_id', postController.putController)
postRoute.delete('/delete/:_id', postController.deleteController)

export default postRoute
