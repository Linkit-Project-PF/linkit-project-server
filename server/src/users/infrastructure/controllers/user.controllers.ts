import { type RequestHandler } from 'express'
import { type UserUseCase } from '../../aplication/userUseCase'

export class UserControllers {
  constructor (private readonly userUseCase: UserUseCase) {}

  public getController: RequestHandler = async (req, res) => { //* function name can change
    try {
      const { email, password } = req.query
      const user = await this.userUseCase.loginUser(String(email), String(password))
      return res.status(200).json(user)
    } catch (error) {
      return res.status(400).json((error as Error).message)
    }
  }

  public postController: RequestHandler = async (req, res) => {
    try {
      const user = await this.userUseCase.registerUser(req.body, String(req.query.type))
      return res.status(201).json(user)
    } catch (error) {
      return res.status(400).json((error as Error).message)
    }
  }

  public putController: RequestHandler = async (req, res) => {
    try {
      const user = await this.userUseCase.editUser(req.params.id, req.body)
      return res.status(200).json(user)
    } catch (error) {
      return res.status(400).json((error as Error).message)
    }
  }

  public deleteController: RequestHandler = async (req, res) => {
    try {
      const user = await this.userUseCase.deleteUser(req.params.id)
      return res.status(200).json(user)
    } catch (error) {
      return res.status(400).json((error as Error).message)
    }
  }

  public putRoleController: RequestHandler = async (req, res) => {
    try {
      const user = await this.userUseCase.editRoleUser(req.body)
      return res.status(200).json(user)
    } catch (error) {
      return res.status(400).json((error as Error).message)
    }
  }
}
