import { Request, Response } from "express";
import { CreateTransaction } from "./CreateTransaction";

export class CreateTransactionController {
  static async handle(request: Request, response: Response) {
    const { date, description, type, value, category_id } = request.body;
    const { user_id } = request.params;

    const createTransaction = new CreateTransaction();

    const transaction = await createTransaction.execute({
      date,
      description,
      type,
      user_id,
      value,
      category_id,
    });

    return response.json(transaction);
  }
}
