import { UserEntity } from "../../domain/user.entity";
import { UserRepository } from "../../domain/user.reposiroty";
import { UserValue } from "../../domain/user.value";
import base from "../db/airtable";

const userTable = base("Users");

export class airtableRepository implements UserRepository {
  async findUserById(uuid: string): Promise<UserEntity | string> {
    return "Not found";
  }

  async registerUser(user: UserEntity): Promise<UserEntity | string> {
    const userFound = await userTable.create([
      {
        fields: {
          Username: "testing",
          Password: "testing",
          Email: "testing",
          Role: "testing",
        },
      },
    ]);
    if (userFound[0].id) {
      return userFound[0].id;
    } else return "Not able to create";
  }

  async deleteUser(uuid: string): Promise<boolean> {
    return false;
  }
}
