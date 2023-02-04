import { Request, Response } from "express";
import { CreateCategory } from "./CreateCategory";

export class CreateCategoryController {
  static async handle(request: Request, response: Response) {
    const { name } = request.body;
    const { user_id } = request.params;

    const createCategory = new CreateCategory();

    const category = await createCategory.execute({
      name,
      user_id,
    });

    return response.json(category);
  }
}
