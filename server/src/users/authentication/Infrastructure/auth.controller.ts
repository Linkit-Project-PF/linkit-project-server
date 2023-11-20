import { type RequestHandler } from 'express'
import { type AuthUseCase } from './authUseCase'

export class AuthControllers {
  constructor (private readonly authUseCase: AuthUseCase) {}

  public getController: RequestHandler = async (req, res) => {
    try {
      const result = await this.authUseCase.login(String(req.query.email), String(req.query.password))
      return res.status(200).json(result)
    } catch (error) {
      return res.status(400).json((error as Error).message)
    }
  }

  public postController: RequestHandler = async (req, res) => {
    try {
      const result = await this.authUseCase.register(req.body)
      return res.status(200).json(result)
    } catch (error) {
      return res.status(400).json((error as Error).message)
    }
  }
}
