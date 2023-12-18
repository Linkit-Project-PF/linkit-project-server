import { type RequestHandler } from 'express'
import { type AdminUseCase } from '../../aplication/adminUseCase'
import getAdminValidator from '../helpers/getAdminValidator'
import { permValidator } from '../../../errors/validation'

export class AdminControllers {
  constructor (private readonly adminUseCase: AdminUseCase) {}

  public getController: RequestHandler = async (req, res) => {
    try {
      await permValidator((req as any).userId, 'get', 'admins')
      const admin = await getAdminValidator(req.query, this.adminUseCase)
      return res.status(200).json(admin)
    } catch (error: any) {
      return res.status(error.code).json(error[(req as any).lang as keyof Error])
    }
  }

  public postController: RequestHandler = async (req, res) => {
    try {
      await permValidator((req as any).userId, 'create', 'admins')
      const admin = await this.adminUseCase.createAdmin(req.body)
      return res.status(201).json(admin)
    } catch (error: any) {
      return res.status(error.code).json(error[(req as any).lang as keyof Error])
    }
  }

  public putController: RequestHandler = async (req, res) => {
    try {
      await permValidator((req as any).userId, 'update', 'admins')
      const admin = await this.adminUseCase.editAdmin(req.params.id, req.body)
      return res.status(200).json(admin)
    } catch (error: any) {
      return res.status(error.code).json(error[(req as any).lang as keyof Error])
    }
  }

  public deleteController: RequestHandler = async (req, res) => {
    try {
      await permValidator((req as any).userId, 'delete', 'admins')
      const admin = await this.adminUseCase.deleteAdmin(req.params.id, req.query.total as string)
      return res.status(200).json(admin)
    } catch (error: any) {
      return res.status(error.code).json(error[(req as any).lang as keyof Error])
    }
  }

  public permissionsController: RequestHandler = async (req, res) => {
    try {
      await permValidator((req as any).userId, 'special', 'permissions')
      const admin = await this.adminUseCase.editPermissions(req.params.id, req.body)
      return res.status(200).json(admin)
    } catch (error: any) {
      return res.status(error.code).json(error[(req as any).lang as keyof Error])
    }
  }
}
