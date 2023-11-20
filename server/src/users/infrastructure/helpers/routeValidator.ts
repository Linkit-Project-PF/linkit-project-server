import { type NextFunction, type Request, type Response } from 'express'

export const authValidator = (req: Request, res: Response, next: NextFunction): Response<any, Record<string, any>> | undefined => {
  const userId = req.headers.authorization?.split(' ')[1]
  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized, no auth header found' })
  }
  (req as any).userId = userId
  next()
}
