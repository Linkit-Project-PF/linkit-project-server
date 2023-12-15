import { ServerError, UncatchedError } from '../../../errors/errors'
import { type JdEntity } from '../../../posts/domain/jd/jd.entity'
import Jd from '../../../posts/infrastructure/schema/Jd'
import { type UserEntity } from '../../../users/domain/user/user.entity'
import User from '../../../users/infrastructure/schema/User'

export async function relatePostulation (postulation: string, userId: string, JDid: string): Promise<void> {
  try {
    const jd = await Jd.findById(JDid)
    const user = await User.findById(userId)
    jd?.users.push(postulation)
    user?.postulations.push(postulation)
    await Jd.findByIdAndUpdate(JDid, jd as JdEntity)
    await User.findByIdAndUpdate(userId, user as UserEntity)
  } catch (error: any) {
    if (error instanceof ServerError) throw error
    else throw new UncatchedError(error.message, 'relating user and/or JD', 'relacionar usuario y/o vacante')
  }
}
