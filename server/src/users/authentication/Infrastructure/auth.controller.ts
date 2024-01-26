import { type RequestHandler } from 'express'
import { type AuthUseCase } from './authUseCase'
import { type translatedResponse } from '../../../interfaces'

export class AuthControllers {
  constructor (private readonly authUseCase: AuthUseCase) {}

  public getController: RequestHandler = async (req, res) => {
    try {
      const result = await this.authUseCase.login(String(req.body.email), String(req.body.password), String(req.body.role))
      return res.status(200).json(result)
    } catch (error: any) {
      return res.status(error.code).json(error[(req as any).lang as keyof Error])
    }
  }

  public postController: RequestHandler = async (req, res) => {
    try {
      const result = await this.authUseCase.register(req.body)
      return res.status(200).json(result)
    } catch (error: any) {
      return res.status(error.code).json(error[(req as any).lang as keyof Error])
    }
  }

  public putController: RequestHandler = async (req, res) => {
    try {
      await this.authUseCase.verify(String(req.query.id), String(req.query.role))
      res.redirect('https://link-it-project.vercel.app')
    } catch (error: any) {
      return res.status(error.code).json(error[(req as any).lang as keyof Error])
    }
  }

  public resetPasswordController: RequestHandler = async (req, res) => {
    try {
      await this.authUseCase.resetPassword(req.query.email as string)
      const response: translatedResponse = {
        en: 'An email to reset your password has been sent to your email',
        es: 'Se ha enviado un enlace a tu correo para cambiar la contraseña'
      }
      res.status(200).send(response[(req as any).lang as keyof translatedResponse])
    } catch (error: any) {
      return res.status(error.code).json(error[(req as any).lang as keyof Error])
    }
  }
}
