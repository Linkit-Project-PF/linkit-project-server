import { ServerError, UncatchedError } from '../../../errors/errors'
import { type JdUseCase } from '../../aplication/jdUseCase'
import { type JdEntity } from '../../domain/jd/jd.entity'

interface JDQuery {
  airTableId?: string
  id?: string
  code?: string
  title?: string
  location?: string
  modality?: string
  stack?: string
  status?: string
  users?: string
  type?: string
  archived?: string
  company?: string
}

export default async function getJDValidator (query: JDQuery, jdUseCase: JdUseCase): Promise<JdEntity | JdEntity[] | string> {
  try {
    let jd
    const filters: string[] = Object.keys(query)
    const values: string[] = Object.values(query)
    if (filters.length) {
      if (filters.length === 1) {
        jd = await jdUseCase.findJD(values[0], filters[0])
      } else {
        jd = await jdUseCase.findJD(values, filters, true)
      }
    } else {
      jd = await jdUseCase.findJD('', 'all')
    }
    return jd
  } catch (error: any) {
    if (error instanceof ServerError) throw error
    else throw new UncatchedError(error.message, 'searching user', 'buscar usuario')
  }
}
