import { type RequestHandler } from 'express'
import { type AdminUseCase } from '../../aplication/adminUseCase'
import getAdminValidator from '../helpers/admin/getAdminValidator'
import adminAuth from '../helpers/admin/adminAuthHelper'

export class AdminControllers {
  constructor (private readonly adminUseCase: AdminUseCase) {}

  public getController: RequestHandler = async (req, res) => {
    try {
      const authValidate = await adminAuth((req as any).userId, 'find')
      if (authValidate.code) return res.status(authValidate.code).json(authValidate.value)
      const admin = await getAdminValidator(req.query, this.adminUseCase)
      return res.status(200).json(admin)
    } catch (error: any) {
      return res.status(error.code).json(error[(req as any).lang as keyof Error])
    }
  }

  public postController: RequestHandler = async (req, res) => {
    try {
      const authValidate = await adminAuth((req as any).userId, 'create')
      if (authValidate.code) return res.status(authValidate.code).json(authValidate.value)
      const admin = await this.adminUseCase.createAdmin(req.body)
      return res.status(201).json(admin)
    } catch (error: any) {
      return res.status(error.code).json(error[(req as any).lang as keyof Error])
    }
  }

  public putController: RequestHandler = async (req, res) => {
    try {
      const authValidate = await adminAuth((req as any).userId, 'edit', req.params.id)
      if (authValidate.code) return res.status(authValidate.code).json(authValidate.value)
      const admin = await this.adminUseCase.editAdmin(req.params.id, req.body)
      return res.status(200).json(admin)
    } catch (error: any) {
      return res.status(error.code).json(error[(req as any).lang as keyof Error])
    }
  }

  public deleteController: RequestHandler = async (req, res) => {
    try {
      const authValidate = await adminAuth((req as any).userId, 'delete', req.params.id)
      if (authValidate.code) return res.status(authValidate.code).json(authValidate.value)
      const admin = await this.adminUseCase.deleteAdmin(req.params.id, req.query.total as string)
      return res.status(200).json(admin)
    } catch (error: any) {
      return res.status(error.code).json(error[(req as any).lang as keyof Error])
    }
  }

  public permissionsController: RequestHandler = async (req, res) => {
    try {
      const admin = await this.adminUseCase.editPermissions(req.params.id, req.body)
      return res.status(200).json(admin)
    } catch (error: any) {
      return res.status(error.code).json(error[(req as any).lang as keyof Error])
    }
  }
}
