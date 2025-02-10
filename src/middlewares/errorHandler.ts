import { Request, Response, NextFunction } from "express";

type descErrors = {
  [key: string]: { message: string; description: string; statusCode: number };
};

const descErrors: descErrors = {
  "PE-IFLR": { message: "Campos invalidos.", description: "Preencha todos os campos para poder realizar o registro.", statusCode: 400 },
  "PE-IFLR-NA": { message: "Campos invalidos.", description: "Preencha o campo de nome para realizar o registro.", statusCode: 400 },
  "PE-IFLR-EM": { message: "Campos invalidos.", description: "Preencha o campo de email para realizar o registro.", statusCode: 400 },
  "PE-IFLR-PW": { message: "Campos invalidos.", description: "Preencha o campo de senha para realizar o registro.", statusCode: 400 },
  "PG-23505-EM": {
    message: "Campos email já registrado.",
    description: "O Email informado ja foi registrado tente recuperar sua conta",
    statusCode: 400,
  },
  "PE-IFLL": { message: "Campos invalidos.", description: "Preencha todos os campos para poder realizar o login.", statusCode: 400 },
  "PE-IFLL-EM": { message: "Campos invalidos.", description: "Preencha o campo de email para realizar o login.", statusCode: 400 },
  "PE-IFLL-PW": { message: "Campos invalidos.", description: "Preencha o campo de senha para realizar o login.", statusCode: 400 },
  "PE-IPLL-PW": { message: "Conta não encontrada.", description: "A senha informada está incorreta.", statusCode: 400 },
  "PE-IELL-PW": { message: "Conta não encontrada.", description: "O email informado está incorreto.", statusCode: 400 },
  "PE-UNKW": {
    message: "Aconteceu um erro.",
    description: "Houve um erro ao tentar realizar sua solicitação tente novamente mais tarde.",
    statusCode: 400,
  },
};

export interface ErrorResponse {
  statusCode: number;
  message: string;
  description?: string;
  stack?: string;
}

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let errorResponse: ErrorResponse = {
    statusCode: statusCode,
    message: err.message,
  };

  if (descErrors[err.message]) {
    const descError = descErrors[err.message];
    statusCode = descError.statusCode;

    errorResponse = {
      statusCode: descError.statusCode,
      message: descError.message,
      description: descError.description,
    };
  }

  if (process.env.DEV === "TRUE") {
    errorResponse.stack = err.stack;
  }

  res.status(statusCode).json(errorResponse);
};
