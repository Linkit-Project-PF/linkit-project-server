import { type NextFunction, type Request, type Response } from 'express'
import { type customError } from './errors/errors'

export const authValidator = (req: Request, res: Response, next: NextFunction): Response<any, Record<string, any>> | undefined => {
  const userId = req.headers.authorization?.split(' ')[1]
  if (!userId) {
    const error: customError = { en: 'Unauthorized, no auth header found', es: 'No autorizado, no se encontro valor de autorizacion en la peticion' }
    return res.status(401).json(error[(req as any).lang as keyof customError])
  }
  (req as any).userId = userId
  next()
}

export const langValidator = (req: Request, res: Response, next: NextFunction): void => {
  const lang = req.headers['accept-language']
  if (lang === 'en' || lang === 'es') {
    (req as any).lang = lang
  } else (req as any).lang = 'es'
  next()
}
