import AppError from "../../../../app-error";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { usersRepository } from "../../repositories/UserRepository";

export class CreateUserUseCase {
  async execute({ name, email, password }: ICreateUserDTO) {
    const userRepository = new usersRepository();
    let user = await userRepository.findByEmail(email);

    if (user) {
      return new AppError("Users already Existis", 400);
    }

    user = userRepository.repository.create({
      email,
      name,
      password,
    });

    userRepository.repository.save(user);

    return user;
  }
}
