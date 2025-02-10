import knex, { Knex } from "knex";
import { IUser } from "../../entities/users";
import { IRegisterUser } from "../../entities/RegisterUser";

class UserModel {
  private db: Knex;

  constructor(db: Knex) {
    this.db = db;
  }

  async getUserByEmail(email: string): Promise<IUser | null> {
    const user = await this.db("users").where({ email }).first();
    return user ? (user as IUser) : null;
  }

  async registerUser(user: IRegisterUser) {
    try {
      return await this.db("users").insert(user);
    } catch (error) {
      if (typeof (error as { code: string }).code == "string") {
        const code = (error as { code: string }).code;
        throw new Error("PG-23505-EM");
      } else {
        throw new Error("PE-UNKW");
      }
    }
  }
}

export { IUser, UserModel };
