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
    } catch (error) {
      return res.status(400).json((error as Error).message)
    }
  }

  public postController: RequestHandler = async (req, res) => {
    try {
      const authValidate = await adminAuth((req as any).userId, 'create')
      if (authValidate.code) return res.status(authValidate.code).json(authValidate.value)
      const admin = await this.adminUseCase.createAdmin(req.body)
      return res.status(201).json(admin)
    } catch (error) {
      return res.status(400).json((error as Error).message)
    }
  }

  public putController: RequestHandler = async (req, res) => {
    try {
      const authValidate = await adminAuth((req as any).userId, 'edit', req.params.id)
      if (authValidate.code) return res.status(authValidate.code).json(authValidate.value)
      const admin = await this.adminUseCase.editAdmin(req.params.id, req.body)
      return res.status(200).json(admin)
    } catch (error) {
      return res.status(400).json((error as Error).message)
    }
  }

  public deleteController: RequestHandler = async (req, res) => {
    try {
      const authValidate = await adminAuth((req as any).userId, 'delete', req.params.id)
      if (authValidate.code) return res.status(authValidate.code).json(authValidate.value)
      const admin = await this.adminUseCase.deleteAdmin(req.params.id)
      return res.status(200).json(admin)
    } catch (error) {
      return res.status(400).json((error as Error).message)
    }
  }
}
