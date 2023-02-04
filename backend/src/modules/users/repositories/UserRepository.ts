import { getRepository, Repository } from "typeorm";
import { Users } from "../entities/User";

class usersRepository extends Repository<Users> {
  repository: Repository<Users>;

  constructor() {
    super();
    this.repository = getRepository(Users);
  }

  public async findByEmail(email: string) {
    return await this.repository.findOne({ where: { email } });
  }
}

export { usersRepository };
