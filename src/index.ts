import dotenv from "dotenv";
import express from "express";
import "./base/routerDecorator";
import { RegisterRoutes } from "./base/routerDecorator";
import cors from "cors";

dotenv.config();

class Server {
  private url: string = process.env.URL || "127.0.0.1";
  private port: string = process.env.PORT || "2000";
  private app;

  constructor() {
    this.app = express();
    this.loadConfig();
    this.loadRoutes();
    this.listenServer();
  }

  private loadConfig() {
    this.app.use(express.json());
    this.app.use(cors());
  }

  private loadRoutes() {
    this.app.use(RegisterRoutes());
  }

  private listenServer() {
    this.app.listen(this.port, () => {
      console.log(`Servidor iniciado ${this.url}:${this.port}`);
    });
  }
}

new Server();
