import { Router } from 'express'
import { authorize, getCalculatorTable, getTiers } from '../helpers/Calculator/googleSheets'
import { filterCalculator } from '../helpers/Calculator/filterCalculator'
import { UncatchedError, type customError } from '../../../errors/errors'

const googleRoute = Router()

// eslint-disable-next-line @typescript-eslint/no-misused-promises
googleRoute.get('/dataTable', async (_req, res) => {
  try {
    const auth = await authorize()
    const data = await getCalculatorTable(auth)
    res.json(data)
  } catch (error: any) {
    const newError = new UncatchedError(error.message, 'obtain googleSheet data', 'traer informacion de googleSheets')
    res.status(500).json(newError[(_req as any).lang as keyof customError])
  }
})

// eslint-disable-next-line @typescript-eslint/no-misused-promises
googleRoute.post('/filter', async (_req, res) => {
  try {
    const { position, englishLevel, seniority } = _req.query
    const { technologies, frameworks, others } = _req.body
    const data = await filterCalculator(
      position as string,
      englishLevel as string,
      seniority as string,
      technologies as string[],
      frameworks as string[],
      others as string[]
    )
    res.json(data)
  } catch (error: any) {
    const newError = new UncatchedError(error.message, 'obtain googleSheet filter', 'traer filtros de googleSheet')
    res.status(500).json(newError[(_req as any).lang as keyof customError])
  }
})

// eslint-disable-next-line @typescript-eslint/no-misused-promises
googleRoute.get('/DinamicTitles', async (_req, res) => {
  try {
    const auth = await authorize()
    const data = await getTiers(auth)

    res.json(data)
  } catch (error: any) {
    const newError = new UncatchedError(error.message, 'obtain googleSheet dynamicTitles', 'traer titulos dinamicos de googleSheet')
    res.status(500).json(newError[(_req as any).lang as keyof customError])
  }
})

export default googleRoute
