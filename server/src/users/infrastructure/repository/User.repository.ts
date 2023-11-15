/* eslint-disable indent */
import { type UserEntity } from '../../domain/user.entity'
import { type UserRepository } from '../../domain/user.reposiroty'
import { ValidateUserRegister, ValidateUserLogin, ValidateUserDelete, ValidateUserUpdate, ValidateId } from '../../../errors/validation'
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
      return userData as UserEntity
    } catch (error: any) {
      if (error.code === 'auth/invalid-email') throw new Error('Email invalido')
      if (error.code === 'auth/invalid-password') throw new Error('Contraseña invalida')
      if (error.code === 'auth/invalid-login-credentials') throw new Error('Credenciles invalidas')
      throw new ValidationError(`Error de inicio de sesión: ${(error as Error).message}`)
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
      return userCreated as UserEntity
    } catch (error: any) {
      // TODO: improve error handling
      if (error.code === 'auth/email-already-in-use') throw new Error('El email ya esta en uso')
      if (error.code === 'auth/invalid-email') throw new Error('Email invalido')
      if (error.code === 'auth/invalid-password') throw new Error('Contraseña invalida')
      throw new ValidationError(`Error de registro: ${(error as Error).message}`)
    }
  }

  async deleteUser (id: string): Promise<UserEntity | string> {
    try {
      ValidateUserDelete(id)
      await mongoDBConnect()
      const resultado = await User.updateOne(
        { id },
        { $set: { active: false } }
      )
      return resultado as unknown as UserEntity
    } catch (error) {
      throw new ValidationError(`Error al eliminar: ${(error as Error).message}`)
    }
  }

  async findUser (value: string, filter: string): Promise<UserEntity | UserEntity[] | string> {
    try {
      let result
      switch (filter) {
        case 'id':
          result = await User.findById(value)
          break
        case 'email':
          result = await User.find({ email: value })
          break
        case 'active':
          result = await User.find({ active: value })
          break
        case 'tech':
          result = (await User.find()).filter(user => user.technologies.includes(value))
          break
        case 'all':
          result = await User.find()
          break
        default:
          result = 'Not a valid parameter'
          break
      }
      return result as unknown as UserEntity
    } catch (error) {
      throw new ValidationError(`Error al buscar: ${(error as Error).message}`)
    }
  }

  async editUser (id: string, user: UserEntity): Promise<UserEntity | string> {
    try {
      ValidateUserUpdate(user)
      const editedUser = await User.findByIdAndUpdate(id, user)
      return editedUser as unknown as UserEntity
    } catch (error) {
      throw new ValidationError(`Error al editar: ${(error as Error).message}`)
    }
  }

  async editRoleUser (id: string): Promise <UserEntity | string> {
    try {
      ValidateUserDelete(id)
      ValidateId(id)
      await mongoDBConnect()
      const result = await User.updateOne(
        { id },
        { $set: { role: 'admin' } }
      )
      return result as unknown as UserEntity
    } catch (error) {
      throw new ValidationError(`Error al intentar cambiar el rol del usuario: ${(error as Error).message}`)
    }
  }
}
