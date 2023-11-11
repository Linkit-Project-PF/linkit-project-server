import { type UserEntity } from '../../domain/user.entity'
import { type UserRepository } from '../../domain/user.reposiroty'
import { ValidateUserRegister, ValidateUserLogin } from '../../../errors/validation'

import { ValidationError } from '../../../errors/errors'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../authentication/firebase'
import User from '../models/User'
import mongoDBConnect from '../../../db/mongo'
import { type Types } from 'mongoose'

export class MongoUserRepository implements UserRepository {
  async loginUser (email: string, password: string): Promise<UserEntity | string> {
    try {
      ValidateUserLogin(email, password)
      await signInWithEmailAndPassword(auth, email, password)
      const [userData] = await User.find({ email })
      return userData
    } catch (error: any) {
      if (error.code === 'auth/invalid-email') throw new Error('Invalid email')
      if (error.code === 'auth/invalid-password') throw new Error('Invalid password')
      if (error.code === 'auth/invalid-login-credentials') throw new Error('Bad credentials')
      throw new ValidationError(`Login error: ${(error as Error).message}`)
    }
  }

  async registerUser (user: UserEntity, type: string): Promise<UserEntity | string> {
    try {
      // TODO: improve logic
      if (type === 'email' && user.password) {
        ValidateUserRegister(user)
        await createUserWithEmailAndPassword(
          auth,
          user.email,
          user.password
        )
      }
      const userCreated = await User.create(user)
      return userCreated
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') throw new Error('Email already in use')
      if (error.code === 'auth/invalid-email') throw new Error('Invalid email')
      if (error.code === 'auth/invalid-password') throw new Error('Invalid password')
      throw new ValidationError(`Register error: ${(error as Error).message}`)
    }
  }

  async deleteUser (_id: Types.ObjectId | null): Promise<any> {
    try {
      await mongoDBConnect()
      const resultado = await User.updateOne(
        { _id },
        { $set: { active: false } }
      )
      return resultado
    } catch (error) {
      return 'error al eliminar usuario'
    }
  }

  async findUserById (id: string): Promise<UserEntity | string> {
    return 'fined User'
  }

  async editUser (user: UserEntity): Promise<UserEntity | string> {
    return 'edited User'
  }
}
