import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'

import { type UserEntity } from '../../domain/user.entity'
import { type UserRepository } from '../../domain/user.reposiroty'
import base from '../db/airtable'
import { auth } from '../../../authentication/firebase'
import { UserValue } from '../../domain/user.value'
const userTable = base('Users')

export class AirtableRepository implements UserRepository {
  async loginUser (email: string, password: string): Promise<UserEntity | string> {
    try {
      await signInWithEmailAndPassword(auth, email, password)
      const dbInfo = await userTable.select({
        view: 'Grid view',
        filterByFormula: `IF({email} = '${email}', TRUE(), FALSE())`
      }).all()
      const userLogged = new UserValue({
        idAirtable: String(dbInfo[0].fields.idAirtable),
        uuid: String(dbInfo[0].fields.uuid),
        username: String(dbInfo[0].fields.username),
        email: String(dbInfo[0].fields.email),
        role: String(dbInfo[0].fields.role)
      })
      return userLogged
    } catch (error: any) {
      if (error.code === 'auth/invalid-email') throw new Error('Invalid email')
      if (error.code === 'auth/invalid-password') throw new Error('Invalid password')
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
      } else throw new Error('No password provided')
      const dataOnDB = {
        uuid: user.uuid,
        username: user.username,
        email: user.email,
        role: user.role
      }
      await userTable.create([
        {
          fields: dataOnDB
        }
      ])
      return dataOnDB
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') throw new Error('Email already in use')
      if (error.code === 'auth/invalid-email') throw new Error('Invalid email')
      if (error.code === 'auth/invalid-password') throw new Error('Invalid password')
      throw new Error(`Register error: ${(error as Error).message}`)
    }
  }

  async editUser (user: UserEntity): Promise<UserEntity | string> {
    return 'Not implemented'
  }

  //! delete in construction
  async deleteUser (uuid: string): Promise<boolean> {
    return false
  }

  //! find in construction
  async findUserById (uuid: string): Promise<UserEntity | string> {
    return 'Not implemented'
  }
}
