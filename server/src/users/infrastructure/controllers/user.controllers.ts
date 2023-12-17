import { type RequestHandler } from 'express'
import { type UserUseCase } from '../../aplication/userUseCase'
import getUserValidator from '../helpers/user/getUserValidator'
import userAuth from '../helpers/user/userAuthHelper'

export class UserControllers {
  constructor (private readonly userUseCase: UserUseCase) {}

  public getController: RequestHandler = async (req, res) => {
    try {
      const response = await userAuth((req as any).userId, 'find')
      if (response.code) return res.status(response.code).json(response.value)
      const user = await getUserValidator(req.query, this.userUseCase)
      return res.status(200).json(user)
    } catch (error: any) {
      return res.status(error.code).json(error[(req as any).lang as keyof Error])
    }
  }

  public postController: RequestHandler = async (req, res) => {
    try {
      const response = await userAuth((req as any).userId, 'create')
      if (response.code) return res.status(response.code).json(response.value)
      const user = await this.userUseCase.createUser(req.body)
      return res.status(201).json(user)
    } catch (error: any) {
      return res.status(error.code).json(error[(req as any).lang as keyof Error])
    }
  }

  public putController: RequestHandler = async (req, res) => {
    try {
      const response = await userAuth((req as any).userId, 'edit', req.params.id)
      if (response.code) return res.status(response.code).json(response.value)
      const user = await this.userUseCase.editUser(req.params.id, req.body)
      return res.status(200).json(user)
    } catch (error: any) {
      return res.status(error.code).json(error[(req as any).lang as keyof Error])
    }
  }

  public deleteController: RequestHandler = async (req, res) => {
    try {
      const response = await userAuth((req as any).userId, 'delete', req.params.id)
      if (response.code) return res.status(response.code).json(response.value)
      const user = await this.userUseCase.deleteUser(req.params.id, req.query.total as string)
      return res.status(200).json(user)
    } catch (error: any) {
      return res.status(error.code).json(error[(req as any).lang as keyof Error])
    }
  }
}
