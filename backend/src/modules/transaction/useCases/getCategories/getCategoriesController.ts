import { Request, Response } from "express";
import { GetCategories } from "./GetCategories";

export class GetCategoriesController {
  static async handle(request: Request, response: Response) {
    const { user_id } = request.params;

    const getCategories = new GetCategories();

    const categories = await getCategories.execute(user_id);

    return response.json(categories);
  }
}
