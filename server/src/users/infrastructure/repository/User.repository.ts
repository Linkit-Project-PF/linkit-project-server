import { type UserEntity } from '../../domain/user.entity'
import { type UserRepository } from '../../domain/user.reposiroty'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../authentication/firebase'
import User from '../models/User'
import { UserValue } from '../../domain/user.value'

export class MongoRepository implements UserRepository {
  async loginUser (email: string, password: string): Promise<UserEntity | string> {
    try {
      await signInWithEmailAndPassword(auth, email, password)
      const [dbUser] = await User.find({ email })
      const userData = new UserValue(dbUser)
      return userData
    } catch (error: any) {
      if (error.code === 'auth/invalid-email') throw new Error('Invalid email')
      if (error.code === 'auth/invalid-password') throw new Error('Invalid password')
      if (error.code === 'auth/invalid-login-credentials') throw new Error('User does not exist')
      throw new Error((error as Error).message)
    }
  }

  async registerUser (user: UserEntity): Promise<UserEntity | string> {
    try {
      if (user.password) {
        await createUserWithEmailAndPassword(
          auth,
          user.email,
          user.password
        )
      }
      const userCreated = await User.create(user)
      const userData = new UserValue(userCreated)
      return userData
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') throw new Error('Email already in use')
      if (error.code === 'auth/invalid-email') throw new Error('Invalid email')
      if (error.code === 'auth/invalid-password') throw new Error('Invalid password')
      throw new Error(`Register error: ${(error as Error).message}`)
    }
  }

  async deleteUser (uuid: string): Promise<boolean | null> {
    return null
  }

  async findUserById (uuid: string): Promise<UserEntity | string> {
    return 'fined User'
  }

  async editUser (user: UserEntity): Promise<UserEntity | string> {
    return 'edited User'
  }
}
