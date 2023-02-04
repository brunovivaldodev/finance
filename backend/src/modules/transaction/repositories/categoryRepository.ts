import { getRepository, Repository } from "typeorm";
import { ICreateCategoryDTO } from "../dtos/ICreateCategoryDTO";
import { Categories } from "../entities/Categories";

export class CategoriesRepository extends Repository<Categories> {
  categoriesRepository: Repository<Categories>;

  constructor() {
    super();
    this.categoriesRepository = getRepository(Categories);
  }

  public async createCategory({ name, user_id }: ICreateCategoryDTO) {
    const category = await this.categoriesRepository.findOne({
      where: { name },
    });

    if (category) {
      throw new Error("category already exists");
    }

    const categories = this.categoriesRepository.create({
      name,
      userId: user_id,
    });

    await this.categoriesRepository.save(categories);

    return categories;
  }

  public async findCategory(name: string, user_id: string) {
    const categories = await this.categoriesRepository.findOne({
      where: { userId: user_id, name },
    });
    return categories;
  }

  public async getCategories(user_id: string) {
    const categories = await this.categoriesRepository.find({
      where: { userId: user_id },
    });

    return categories;
  }
}
