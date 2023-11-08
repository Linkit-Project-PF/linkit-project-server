import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'

import { type UserEntity } from '../../domain/user.entity'
import { type UserRepository } from '../../domain/user.reposiroty'
import base from '../db/airtable'
import { auth } from '../../../authentication/firebase'
import { UserValue } from '../../domain/user.value'

const userTable = base('Users')

export class AirtableRepository implements UserRepository {
  //! find in construction
  async findUserById (uuid: string): Promise<UserEntity | string> {
    const user = await userTable.find(uuid)
    if (user) return 'Found'
    else return 'Not found'
  }

  async loginUser (email: string, password: string): Promise<UserEntity | string> {
    try {
      await signInWithEmailAndPassword(auth, email, password)
      const dbInfo = await userTable.select({
        view: 'Grid view',
        filterByFormula: `IF({email} = '${email}', TRUE(), FALSE())`
      }).all()
      const userLogged = new UserValue({
        uuid: String(dbInfo[0].fields.uuid),
        username: String(dbInfo[0].fields.username),
        email: String(dbInfo[0].fields.email),
        role: String(dbInfo[0].fields.role)
      })
      return userLogged
    } catch (error) {
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
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }

  async deleteUser (uuid: string): Promise<boolean> {
    return false
  }
}
