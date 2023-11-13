import { type UserEntity } from '../../domain/user.entity'
import { type UserRepository } from '../../domain/user.reposiroty'
import { ValidateUserRegister, ValidateUserLogin, ValidateUserDelete } from '../../../errors/validation'
import { ValidationError } from '../../../errors/errors'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../authentication/firebase'
import User from '../models/User'
import mongoDBConnect from '../../../db/mongo'

export class MongoUserRepository implements UserRepository {
  async loginUser (email: string, password: string): Promise<UserEntity | string> {
    try {
      ValidateUserLogin(email, password)
      await signInWithEmailAndPassword(auth, email, password)
      const [userData] = await User.find({ email })
      return userData
    } catch (error: any) {
      if (error.code === 'auth/invalid-email') throw new Error('Email invalido')
      if (error.code === 'auth/invalid-password') throw new Error('Contraseña invalida')
      if (error.code === 'auth/invalid-login-credentials') throw new Error('Credenciles invalidas')
      throw new ValidationError(`Error de inicio de sección: ${(error as Error).message}`)
    }
  }

  async registerUser (user: UserEntity, type: string): Promise<UserEntity | string> {
    try {
      // TODO: this can be modularized, as validateIfAlreadyonDB
      let userExist = false
      const allUsers = await User.find({}, 'email')
      allUsers.forEach(obj => {
        if (obj.email === user.email) userExist = true
      })
      if (userExist) throw Error('Este email ya esta en uso')
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
      // TODO: improve error handling
      if (error.code === 'auth/email-already-in-use') throw new Error('El email ya esta en uso')
      if (error.code === 'auth/invalid-email') throw new Error('Email invalido')
      if (error.code === 'auth/invalid-password') throw new Error('Contraseña invalida')
      throw new ValidationError(`Error de registro: ${(error as Error).message}`)
    }
  }

  async deleteUser (_id: string): Promise<any> {
    try {
      ValidateUserDelete(_id)
      await mongoDBConnect()
      const resultado = await User.updateOne(
        { _id },
        { $set: { active: false } }
      )
      return resultado
    } catch (error) {
      throw new ValidationError(`Error al eliminar: ${(error as Error).message}`)
    }
  }

  async findUserById (id: string): Promise<UserEntity | string> {
    return 'fined User'
  }

  async editUser (user: UserEntity): Promise<UserEntity | string> {
    return 'edited User'
  }

  async editRoleUser (_id: string): Promise <any> {
    try {
      ValidateUserDelete(_id)
      await mongoDBConnect()
      const result = await User.updateOne(
        { _id },
        { $set: { role: 'admin' } }
      )
      return result
    } catch (error) {
      throw new Error('No fue posible realizar la acción de cambiar el rol')
    }
  }
}
