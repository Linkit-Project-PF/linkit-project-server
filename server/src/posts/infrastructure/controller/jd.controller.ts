import { type RequestHandler } from 'express'
import { type JdUseCase } from '../../aplication/jdUseCase'
import getJDValidator from '../helpers/JDs/getJDValidator'
import jdAuth from '../helpers/JDs/JDAuthHelper'

export class JdController {
  constructor (private readonly jdUseCase: JdUseCase) {}

  public postController: RequestHandler = async (req, res) => {
    try {
      const authValidate = await jdAuth((req as any).userId, 'create')
      if (authValidate.code) return res.status(authValidate.code).json(authValidate.value)
      const jd = await this.jdUseCase.createJD(req.body)
      if (typeof jd === 'string') return res.status(409).json(jd)
      return res.status(201).json(jd)
    } catch (error) {
      return res.status(400).json((error as Error).message)
    }
  }

  public getController: RequestHandler = async (req, res) => {
    try {
      const authValidate = await jdAuth((req as any).userId, 'find')
      if (authValidate.code) return res.status(authValidate.code).json(authValidate.value)
      const post = await getJDValidator(req.query, this.jdUseCase)
      return res.status(200).json(post)
    } catch (error) {
      return res.status(400).json((error as Error).message)
    }
  }

  public putController: RequestHandler = async (req, res) => {
    try {
      const authValidate = await jdAuth((req as any).userId, 'edit')
      if (authValidate.code) return res.status(authValidate.code).json(authValidate.value)
      const editedJd = await this.jdUseCase.editJD(req.params._id, req.body)
      return res.status(200).json(editedJd)
    } catch (error) {
      return res.status(400).json((error as Error).message)
    }
  }

  public deleteController: RequestHandler = async (req, res) => {
    try {
      const authValidate = await jdAuth((req as any).userId, 'delete')
      if (authValidate.code) return res.status(authValidate.code).json(authValidate.value)
      const { id } = req.params
      await this.jdUseCase.deleteJD(id)
      return res.status(200).json('Vacante eliminada')
    } catch (error) {
      return res.status(400).json((error as Error).message)
    }
  }
}
