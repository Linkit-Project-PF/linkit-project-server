import { ServerError, UncatchedError } from '../../../errors/errors'
import { type JdEntity } from '../../../posts/domain/jd/jd.entity'
import Jd from '../../../posts/infrastructure/schema/Jd'
import { type UserEntity } from '../../../users/domain/user/user.entity'
import User from '../../../users/infrastructure/schema/User'
import { type PostulationEntity } from '../../domain/postulation.entity'

export async function relatePostulation (postulation: PostulationEntity, operation: string): Promise<void> {
  try {
    const id = (postulation as any)._id
    const jd = await Jd.findById(postulation.jd) as JdEntity
    const user = await User.findById(postulation.user) as UserEntity
    if (operation === 'create') {
      jd.users.push(id)
      user.postulations.push(id)
    } else if (operation === 'delete') {
      let jdIndex: number = -1
      let userIndex: number = -1
      jd.users.forEach((post, index) => { if (post.toString() === id.toString()) jdIndex = index })
      user.postulations.forEach((post, index) => { if (post.toString() === id.toString()) userIndex = index })
      if (jdIndex < 0 || userIndex < 0) throw new ServerError('Postulation is not related to JD and/or user', 'La postulacion no esta relacionada con el usuario o vacante', 404)
      jd.users.splice(jdIndex, 1)
      user.postulations.splice(userIndex, 1)
    }
    await Jd.findByIdAndUpdate(postulation.jd, jd)
    await User.findByIdAndUpdate(postulation.user, user)
  } catch (error: any) {
    if (error instanceof ServerError) throw error
    else throw new UncatchedError(error.message, 'relating user and/or JD', 'relacionar usuario y/o vacante')
  }
}
