import { type UserEntity } from '../../../domain/user/user.entity'
import User from '../../collections/User'

export default async function UserCombinedFilters (filters: string[], values: string[], validSingleFilters: string[], validIncludeFilters: string[]): Promise<UserEntity[]> {
  try {
    const allFilters = [...validIncludeFilters, ...validSingleFilters]
    filters.forEach(filter => {
      if (!allFilters.includes(filter)) throw Error('Not a valid filter')
    })
    let result = await User.find()
    for (let i = 0; i < filters.length; i++) {
      if (validIncludeFilters.includes(filters[i])) {
        result = result.filter(data => (data as any)[filters[i]].includes(values[i]))
      } else {
        result = result.filter(data => String((data as any)[filters[i]]) === values[i])
      }
    }
    return result as UserEntity[]
  } catch (error: any) {
    throw Error('Error combining filters: ' + error.message)
  }
}
