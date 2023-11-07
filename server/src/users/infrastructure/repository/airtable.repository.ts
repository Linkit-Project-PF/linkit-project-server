import { createUserWithEmailAndPassword } from "firebase/auth";
import { UserEntity } from "../../domain/user.entity";
import { UserRepository } from "../../domain/user.reposiroty";
import base from "../db/airtable";
import { auth } from "../../../authentication/firebase";

const userTable = base("Users");

export class airtableRepository implements UserRepository {
  async findUserById(uuid: string): Promise<UserEntity | string> {
    return "Not found";
  }

  async registerUser(user: UserEntity): Promise<UserEntity | string> {
    try {
      try {
        const userCredentials = await createUserWithEmailAndPassword(
          auth,
          user.email,
          user.password
        );
        console.log(userCredentials);
      } catch (error) {
        console.log(error);
        throw new Error();
      }
      const userFound = await userTable.create([
        {
          fields: {
            Username: user.username,
            Password: user.password, //! TESTING, password wont be saved on DB
            Email: user.email,
            Role: user.role,
          },
        },
      ]);
      if (userFound[0].id) {
        return userFound[0].id;
      } else return "Not able to create";
    } catch (error) {
      return "El error es" + error;
    }
  }

  async deleteUser(uuid: string): Promise<boolean> {
    return false;
  }
}
