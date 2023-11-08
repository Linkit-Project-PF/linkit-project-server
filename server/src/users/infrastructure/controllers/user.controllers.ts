import { type RequestHandler } from 'express'

import { type UserUseCase } from '../../aplication/userUseCase'

export class UserControllers {
  constructor (private readonly userUseCase: UserUseCase) {}

  public getController: RequestHandler = async (req, res) => { //* function name can change
    try {
      const { email, password }: { email: string, password: string } = req.body
      const user = await this.userUseCase.loginUser(email, password)
      return res.status(200).json(user)
    } catch (error) {
      return res.status(400).json((error as Error).message)
    }
  }

  public postController: RequestHandler = async (req, res) => {
    try {
      const user = await this.userUseCase.registerUser(req.body)
      return res.status(201).json(user)
    } catch (error) {
      return res.status(400).json((error as Error).message)
    }
  }

  public putController: RequestHandler = async (req, res) => {
    try {
      const user = await this.userUseCase.editUser(req.body)
      return res.status(200).json(user)
    } catch (error) {
      return res.status(400).json((error as Error).message)
    }
  }
}

// public getController: RequestHandler = async (req, res): Promise<void> => {
//   const user = await this.userUseCase.findUserById(req.params.id)
//   res.send(user)
// }
