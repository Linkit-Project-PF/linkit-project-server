import { type RequestHandler } from 'express'
import { type OKRsUseCase } from '../../aplication/OKRsUseCase'

export class OKRsController {
  constructor (private readonly OKRsUseCase: OKRsUseCase) {}
  public postController: RequestHandler = async (req, res) => {
    try {
      const OKR = await this.OKRsUseCase.createOKR(req.body)
      return res.status(201).json(OKR)
    } catch (error: any) {
      return res.status(error.code).json(error[(req as any).lang as keyof Error])
    }
  }

  public getController: RequestHandler = async (req, res) => {
    try {
      const OKRAnswer = await this.OKRsUseCase.findOKR()
      return res.status(201).json(OKRAnswer)
    } catch (error: any) {
      return res.status(error.code).json(error[(req as any).lang as keyof Error])
    }
  }

  public putController: RequestHandler = async (req, res) => {
    try {
      const editedOKR = await this.OKRsUseCase.editOKR(req.params._id, req.body)
      return res.status(200).json(editedOKR)
    } catch (error: any) {
      return res.status(error.code).json(error[(req as any).lang as keyof Error])
    }
  }

  public deleteController: RequestHandler = async (req, res) => {
    try {
      const { _id } = req.params
      const result = await this.OKRsUseCase.deleteOKR(_id)
      return res.status(200).json(result)
    } catch (error: any) {
      return res.status(error.code).json(error[(req as any).lang as keyof Error])
    }
  }
}
