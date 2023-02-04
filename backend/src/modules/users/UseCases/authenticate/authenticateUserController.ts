import { AuthenticateUserCase } from "./authenticateUser";
import { Request, Response } from "express";

class AuthenticateUserController {
  static async handle(request: Request, response: Response) {
    const { email, password } = request.body;

    const authenticateUserUseCase = new AuthenticateUserCase();

    const user = await authenticateUserUseCase.execute({
      email,
      password,
    });

    return response.status(201).json(user);
  }
}

export default AuthenticateUserController;
