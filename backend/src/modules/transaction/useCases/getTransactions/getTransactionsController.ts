import { Request, Response } from "express";
import { GetTransactions } from "./GetTransaction";

export class GetTransactionController {
  static async handle(request: Request, response: Response) {
    const { user_id } = request.params;

    const getTransactions = new GetTransactions();

    const transaction = await getTransactions.execute(user_id);

    return response.json(transaction);
  }
}
