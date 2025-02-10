import { Request, Response, NextFunction } from "express";

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const cosovo = req.headers["cosovo"];

  if (cosovo) {
    next();
  } else {
    res.status(400).send("You not is the gang");
    return;
  }
}

export function authMiddleware2(req: Request, res: Response, next: NextFunction) {
  const cosovo = req.headers["cosovo2"];

  if (cosovo) {
    next();
  } else {
    res.status(400).send("You not is the gang Bro");
    return;
  }
}
