import AppError from "../../../../app-error";
import { ICreateCategoryDTO } from "../../dtos/ICreateCategoryDTO";
import { CategoriesRepository } from "../../repositories/categoryRepository";

export class CreateCategory {
  async execute({ name, user_id }: ICreateCategoryDTO) {
    const categoryRepository = new CategoriesRepository();

    const categoryExist = await categoryRepository.findCategory(name, user_id);

    if (categoryExist) {
      return new AppError("Category Already Exists");
    }

    const Category = categoryRepository.createCategory({ name, user_id });

    return Category;
  }
}
