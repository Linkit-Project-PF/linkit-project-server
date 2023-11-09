import { type UserEntity } from '../../domain/user.entity'
import { type UserRepository } from '../../domain/user.reposiroty'

export class AirtableRepository implements UserRepository {
  async loginUser (email: string, password: string): Promise<UserEntity | string> { //!
    // try {
    //   await signInWithEmailAndPassword(auth, email, password)
    //   const dbInfo = await userTable.select({
    //     view: 'Grid view',
    //     filterByFormula: `IF({email} = '${email}', TRUE(), FALSE())`
    //   }).all()
    //   const userLogged = new UserValue({
    //     idAirtable: String(dbInfo[0].fields.idAirtable),
    //     uuid: String(dbInfo[0].fields.uuid),
    //     username: String(dbInfo[0].fields.username),
    //     email: String(dbInfo[0].fields.email),
    //     role: String(dbInfo[0].fields.role)
    //   })
    //   return userLogged
    // } catch (error: any) {
    //   if (error.code === 'auth/invalid-email') throw new Error('Invalid email')
    //   if (error.code === 'auth/invalid-password') throw new Error('Invalid password')
    //   if (error.code === 'auth/invalid-login-credentials') throw new Error('User does not exist')
    //   throw new Error((error as Error).message)
    // }
    return 'TESTING'
  }

  async registerUser (user: UserEntity): Promise<UserEntity | string> {
    // try {
    //   if (user.password) {
    //     await createUserWithEmailAndPassword(
    //       auth,
    //       user.email,
    //       user.password
    //     )
    //   } else throw new Error('No password provided')
    //   const dataOnDB = new UserValue({
    //     uuid: user.uuid,
    //     username: user.username,
    //     email: user.email,
    //     role: user.role
    //   })

    //   await userTable.create([
    //     {
    //       fields: {
    //         uuid: dataOnDB.uuid,
    //         username: dataOnDB.username,
    //         email: dataOnDB.email,
    //         role: dataOnDB.role
    //       }
    //     }
    //   ]).then(result => { dataOnDB.idAirtable = result[0].getId() })
    //   return dataOnDB
    // } catch (error: any) {
    //   if (error.code === 'auth/email-already-in-use') throw new Error('Email already in use')
    //   if (error.code === 'auth/invalid-email') throw new Error('Invalid email')
    //   if (error.code === 'auth/invalid-password') throw new Error('Invalid password')
    //   throw new Error(`Register error: ${(error as Error).message}`)
    // }
    return 'TESTING'
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
