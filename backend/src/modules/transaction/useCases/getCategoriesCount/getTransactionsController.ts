import { Request, Response } from "express";
import { GetCategoriesCount } from "./GetTransaction";

export class GetCategoriesCountController {
  static async handle(request: Request, response: Response) {

    const getTransactions = new GetCategoriesCount();

    const transaction = await getTransactions.execute();

    return response.json(transaction);
  }
}
