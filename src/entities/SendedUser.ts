import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { IUser } from "./users";

interface ISendedUser {
  email: string;
  password: string;
}

class SendedUser implements ISendedUser {
  email: string;
  password: string;
  id?: number;
  jwtKey?: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
    this.validateNewIfNotNull();
  }

  async validatePassword(user: IUser) {
    const passwordIsValid = await bcrypt.compare(this.password, user.password);
    if (passwordIsValid) {
      this.id = user.id;
      this.generateJWT();
    } else {
      throw new Error("PE-IPLL-PW");
    }
  }

  private validateNewIfNotNull(): void {
    const isEmailValid = this.email !== null && this.email !== undefined && this.email.trim() !== "";
    const isPasswordValid = this.password !== null && this.password !== undefined && this.password.trim() !== "";

    if (!isEmailValid && !isPasswordValid) {
      throw new Error("PE-IFLL");
    }

    if (!isEmailValid) throw new Error("PE-IFLL-EM");
    if (!isPasswordValid) throw new Error("PE-IFLL-PW");
  }

  async generateJWT() {
    try {
      this.jwtKey = jwt.sign({ id: this.id }, "privateKEY");
    } catch (error) {}
  }
}

export { SendedUser, ISendedUser };
