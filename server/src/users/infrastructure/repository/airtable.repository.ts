import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'

import { type UserEntity } from '../../domain/user.entity'
import { type UserRepository } from '../../domain/user.reposiroty'
import base from '../db/airtable'
import { auth } from '../../../authentication/firebase'

const userTable = base('Users')

export class AirtableRepository implements UserRepository {
  async findUserById (uuid: string): Promise<UserEntity | string> {
    const user = await userTable.find(uuid)
    if (user) return 'Found'
    else return 'Not found'
  }

  async loginUser (email: string, password: string): Promise<any | null> {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      const userEmail = userCredential.user.email
      // const user = userTable.select({
      //   filterByFormula: `{Email} = "${userEmail}"`
      // }).firstPage((err: any): void => {
      //   if (err) {
      //     console.error(err)
      //   }
      // })
      return userEmail
    } catch (error: any) {
      throw new Error(error.code)
    }
  }

  async registerUser (user: UserEntity): Promise<UserEntity | string> {
    try {
      try {
        const userCredentials = await createUserWithEmailAndPassword(
          auth,
          user.email,
          user.password
        )
        console.log(userCredentials)
      } catch (error: any) {
        throw new Error(error.code)
      }
      const newUser = await userTable.create([
        {
          fields: {
            Username: user.username,
            Password: user.password, //! TESTING, password wont be saved on DB
            Email: user.email,
            Role: user.role
          }
        }
      ])
      if (newUser[0].id) {
        return newUser[0].id
      } else return 'Not able to create'
    } catch (error: any) {
      return 'Unable to create account: ' + error.message
    }
  }

  async deleteUser (uuid: string): Promise<boolean> {
    return false
  }
}
