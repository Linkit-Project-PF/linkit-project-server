import { type RequestHandler } from 'express'

import { type UserUseCase } from '../../aplication/userUseCase'

export class UserControllers {
  constructor (private readonly userUseCase: UserUseCase) {}

  // public getController () {}

  public postController: RequestHandler = async (req, res): Promise<void> => {
    const user = await this.userUseCase.registerUser(req.body)
    res.send(user)
  }

  public getController: RequestHandler = async (req, res): Promise<void> => {
    const user = await this.userUseCase.findUserById(req.params.id)
    res.send(user)
  }

  public loginController: RequestHandler = async (req, res): Promise<string | null> => {
    const { email, password } = req.body
    const user = await this.userUseCase.loginUser(email, password)
    return user
  }
}
