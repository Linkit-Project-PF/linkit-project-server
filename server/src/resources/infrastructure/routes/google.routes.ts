import { Router } from 'express'
import { authorize, getCalculatorTable } from '../helpers/Calculator/googleSheets'
import { filterCalculator } from '../helpers/Calculator/filterCalculator'
const googleRoute = Router()

// eslint-disable-next-line @typescript-eslint/no-misused-promises
googleRoute.get('/:dataTable', async (_req, res) => {
  try {
    const auth = await authorize()
    const data = await getCalculatorTable(auth)
    res.json(data)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

// eslint-disable-next-line @typescript-eslint/no-misused-promises
googleRoute.get('/:filter', async (_req, res) => {
  try {
    const { position, enlgishLevel, seniority, technologies, frameworks, others } = _req.query
    const data = await filterCalculator(
      position as string,
      enlgishLevel as string,
      seniority as string,
      technologies as string[],
      frameworks as string[],
      others as string[]
    )
    res.json(data)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

export default googleRoute
