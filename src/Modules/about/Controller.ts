import { Response, Request } from "express";
import aboutData from "./typeAbout";
import { Controller, Get } from "../../base/routerDecorator";

@Controller("/")
export class AboutController {
  @Get("/")
  about(req: Request, res: Response) {
    res.status(200);
    res.json(aboutData);
  }
}
