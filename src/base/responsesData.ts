type ReturnResponse = {
  [key: string]: { message: string; description?: string; statusCode: number; jwt?: string };
};

export const returnResponse: ReturnResponse = {
  "PR-RORS": { message: "Conta registrada com sucesso!", description: "Conta registrada com sucesso.", statusCode: 200 },
  "PR-LOSU": { message: "Login realizado com sucesso!", jwt: "", statusCode: 200 },
};
