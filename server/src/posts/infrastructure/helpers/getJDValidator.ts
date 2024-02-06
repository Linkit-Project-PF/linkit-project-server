import { ServerError, UncatchedError } from '../../../errors/errors'
import { type JdUseCase } from '../../aplication/jdUseCase'
import { type JdEntity } from '../../domain/jd/jd.entity'

interface JDQuery {
  id?: string
  code?: string
  title?: string
  type?: string
  location?: string
  modality?: string
  stack?: string
  archived?: string
  company?: string
}

export default async function getJDValidator (query: JDQuery, jdUseCase: JdUseCase, lang?: string): Promise<JdEntity | JdEntity[] | string> {
  try {
    let jd
    const filters: string[] = Object.keys(query)
    const values: string[] = Object.values(query)
    if (filters.length) {
      if (filters.length === 1) {
        jd = await jdUseCase.findJD(values[0], filters[0], lang)
      } else {
        jd = await jdUseCase.findJD(values, filters, '', true)
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
