import { type JdEntity } from '../../../posts/domain/jd/jd.entity'
import Jd from '../../../posts/infrastructure/schema/Jd'
import { type UserEntity } from '../../domain/user/user.entity'
import User from '../collections/User'

export default async function CombinedFilters (filters: string[], values: string[], validSingleFilters: string[], validIncludeFilters: string[], type: string): Promise<UserEntity[] | JdEntity[]> {
  try {
    const allFilters = [...validIncludeFilters, ...validSingleFilters]
    filters.forEach(filter => {
      if (!allFilters.includes(filter)) throw Error('Not a valid filter')
    })
    let result
    if (type === 'user') result = await User.find()
    else if (type === 'jd') result = await Jd.find()
    else throw Error('Not a valid schema type')
    for (let i = 0; i < filters.length; i++) {
      if (validIncludeFilters.includes(filters[i])) {
        result = result.filter(data => (data as any)[filters[i]].includes(values[i]))
      } else {
        result = result.filter(data => String((data as any)[filters[i]]) === values[i])
      }
    }
    if (type === 'user') return result as UserEntity[]
    else return result as JdEntity[]
  } catch (error: any) {
    throw Error('Error combining filters: ' + error.message)
  }
}
