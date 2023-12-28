import { type RequestHandler } from 'express'
import { getAuth, sendPasswordResetEmail } from 'firebase/auth'
import { type UserUseCase } from '../../aplication/userUseCase'
import getUserValidator from '../helpers/getUserValidator'
import { permValidator } from '../../../errors/validation'

export class UserControllers {
  constructor (private readonly userUseCase: UserUseCase) {}

  public getController: RequestHandler = async (req, res) => {
    try {
      await permValidator((req as any).userId, 'get', 'users')
      const user = await getUserValidator(req.query, this.userUseCase)
      return res.status(200).json(user)
    } catch (error: any) {
      return res.status(error.code).json(error[(req as any).lang as keyof Error])
    }
  }

  public postController: RequestHandler = async (req, res) => {
    try {
      await permValidator((req as any).userId, 'create', 'users')
      const user = await this.userUseCase.createUser(req.body)
      return res.status(201).json(user)
    } catch (error: any) {
      return res.status(error.code).json(error[(req as any).lang as keyof Error])
    }
  }

  public putController: RequestHandler = async (req, res) => {
    try {
      const { password, email } = req.body
      await permValidator((req as any).userId, 'update', 'users')
      if (password) {
        const auth = getAuth()
        await sendPasswordResetEmail(auth, email)
        return res.status(200).json('result')
      } else {
        const user = await this.userUseCase.editUser(req.params.id, req.body)
        return res.status(200).json(user)
      }
    } catch (error: any) {
      return res.status(error.code).json(error[(req as any).lang as keyof Error])
    }
  }

  public deleteController: RequestHandler = async (req, res) => {
    try {
      await permValidator((req as any).userId, 'delete', 'users')
      const user = await this.userUseCase.deleteUser(req.params.id, (req as any).userId, req.query.total as string)
      return res.status(200).json(user)
    } catch (error: any) {
      return res.status(error.code).json(error[(req as any).lang as keyof Error])
    }
  }
}
