import { CategoriesRepository } from "../../repositories/categoryRepository";

export class GetCategories {
  async execute(user_id: string) {
    const categoriesRepository = new CategoriesRepository();

    const categories = await categoriesRepository.getCategories(user_id);

    return categories;
  }
}
