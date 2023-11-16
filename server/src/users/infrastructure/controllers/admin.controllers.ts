import { type RequestHandler } from 'express'
import { type AdminUseCase } from '../../aplication/adminUseCase'

export class AdminControllers {
  constructor (private readonly adminUseCase: AdminUseCase) {}

  public getController: RequestHandler = async (req, res) => {
    try {
      const admin = await this.adminUseCase.loginAdmin(req.body.email, req.body.password)
      return res.status(200).json(admin)
    } catch (error) {
      return res.status(400).json((error as Error).message)
    }
  }

  public postController: RequestHandler = async (req, res) => {
    try {
      const admin = await this.adminUseCase.registerAdmin(req.body, String(req.query.type))
      return res.status(201).json(admin)
    } catch (error) {
      return res.status(400).json((error as Error).message)
    }
  }

  public putController: RequestHandler = async (req, res) => {
    try {
      const admin = await this.adminUseCase.editAdmin(req.params.id, req.body)
      return res.status(200).json(admin)
    } catch (error) {
      return res.status(400).json((error as Error).message)
    }
  }

  public deleteController: RequestHandler = async (req, res) => {
    try {
      const admin = await this.adminUseCase.deleteAdmin(req.params.id)
      return res.status(200).json(admin)
    } catch (error) {
      return res.status(400).json((error as Error).message)
    }
  }
}
