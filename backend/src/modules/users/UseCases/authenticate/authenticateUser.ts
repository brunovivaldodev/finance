import AppError from "../../../../app-error";
import { IAuthenticateUserDTO } from "../../dtos/IAuthenticateUserDTO";
import { usersRepository } from "../../repositories/UserRepository";

export class AuthenticateUserCase {
  async execute({ email, password }: IAuthenticateUserDTO) {
    const userRepository = new usersRepository();
    let user = await userRepository.findByEmail(email);

    if (!user) {
      return new AppError("Email ou Password Inválido", 400);
    }

    if (user?.password !== password) {
      return new AppError("Email ou Password Inválido", 400);
    }

    return { name: user.name, email: user.email, id: user.id };
  }
}
