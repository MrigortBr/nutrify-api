import { returnResponse } from "../../base/responsesData";
import { Controller, Post, Put } from "../../base/routerDecorator";
import DatabaseConnection from "../../data/connection";
import { IRegisterUser, RegisterUser } from "../../entities/RegisterUser";
import { SendedUser } from "../../entities/SendedUser";
import { UserModel } from "./Model";
import { Response, Request, NextFunction } from "express";

@Controller("/user")
export class UserController {
  private model: UserModel;

  constructor() {
    this.model = new UserModel(DatabaseConnection.getInstance());
  }

  @Post("/login")
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const body = req.body;

      const sendedUser = new SendedUser(req.body.email, req.body.password);

      const user = await this.model.getUserByEmail(sendedUser.email);

      if (user != null) {
        await sendedUser.validatePassword(user);
      } else {
        throw new Error("PE-IELL-PW");
      }

      sendedUser.generateJWT();

      const response = returnResponse["PR-LOSU"];
      response.jwt = sendedUser.jwtKey;

      res.status(response.statusCode);
      res.json(response);
    } catch (error) {
      next(error);
    }
  }

  @Post("/register")
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const body = req.body;

      const userData: IRegisterUser = {
        email: body.email,
        name: body.name,
        password: body.password,
      };

      const registerUser = await RegisterUser.create(userData);

      const result = await this.model.registerUser(registerUser);

      const response = returnResponse["PR-RORS"];

      res.status(response.statusCode);
      res.json(response);
    } catch (error) {
      next(error);
    }
  }
}
