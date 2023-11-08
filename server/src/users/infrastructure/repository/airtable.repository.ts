import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'

import { type UserEntity } from '../../domain/user.entity'
import { type UserRepository } from '../../domain/user.reposiroty'
import base from '../db/airtable'
import { auth } from '../../../authentication/firebase'

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
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      const userEmail = userCredential.user.email
      if (userEmail) {
        console.log(userEmail)
        // TODO: testing user return for login
        const userLogged = {
          uuid: '1234-1234-1234-1234',
          username: 'userTest',
          password: '1234-1234-1234-1234',
          email: 'userEmail'
        }
        return userLogged
      } else return 'Not able to login'
    } catch (error) {
      throw new Error((error as Error).message)
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
      } catch (error) {
        throw new Error((error as Error).message)
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
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }

  async deleteUser (uuid: string): Promise<boolean> {
    return false
  }
}
