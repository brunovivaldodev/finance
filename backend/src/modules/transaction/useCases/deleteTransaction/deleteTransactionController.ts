import { Request, Response } from "express";
import { DeleteTransaction } from "./DeleteTransaction";

export class DeleteTransactionController {
  static async handle(request: Request, response: Response) {
    const { user_id, transaction_id } = request.params;

    const deleteTransaction = new DeleteTransaction();

    const transaction = await deleteTransaction.execute({
      user_id,
      transaction_id,
    });

    return response.json(transaction);
  }
}
