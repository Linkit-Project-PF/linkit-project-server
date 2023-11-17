import { type JdUseCase } from '../../aplication/jdUseCase'
import { type JdEntity } from '../../domain/jd/jd.entity'

interface JDQuery {
  id?: string
  title?: string
  location?: string
  modality?: string
  stack?: string
  schedule?: string
  archived?: string
}

export default async function getJDValidator (query: JDQuery, jdUseCase: JdUseCase): Promise<JdEntity | JdEntity[] | string> {
  try {
    let jd
    if (Object.keys(query).length) {
      const filter: string = Object.keys(query)[0]
      const value: string = Object.values(query)[0]
      console.log(filter, value)
      jd = await jdUseCase.findJD(value, filter)
    } else {
      jd = await jdUseCase.findJD('', 'all')
    }
    return jd
  } catch (error: any) {
    throw Error(error)
  }
}
