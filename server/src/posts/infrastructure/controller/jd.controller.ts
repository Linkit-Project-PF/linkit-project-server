import { type RequestHandler } from 'express'
import { type JdUseCase } from '../../aplication/jdUseCase'

export class JdController {
  constructor (private readonly jdUseCase: JdUseCase) {}

  public postJdController: RequestHandler = async (req, res) => {
    try {
      const jd = await this.jdUseCase.createJD(req.body)
      if (typeof jd === 'string') return res.status(409).json(jd)
      return res.status(201).json(jd)
    } catch (error) {
      return res.status(400).json((error as Error).message)
    }
  }

  public getJdController: RequestHandler = async (req, res) => {
    try {
      const post = await this.jdUseCase.findJD(
        String(req.query.id),
        String(req.query.title),
        String(req.query.createdDate),
        String(req.query.requisites),
        String(req.query.modality),
        String(req.query.location),
        String(req.query.schedule),
        String(req.query.stack)
      )
      return res.status(200).json(post)
    } catch (error) {
      return res.status(400).json((error as Error).message)
    }
  }

  public putJdController: RequestHandler = async (req, res) => {
    try {
      const editedJd = await this.jdUseCase.editJD(req.params._id, req.body)
      return res.status(200).json(editedJd)
    } catch (error) {
      return res.status(400).json((error as Error).message)
    }
  }

  public deleteJdController: RequestHandler = async (req, res) => {
    try {
      const { id } = req.params
      await this.jdUseCase.deleteJD(id)
      return res.status(200).json('Vacante eliminada o finalizada')
    } catch (error) {
      return res.status(400).json((error as Error).message)
    }
  }
}
