import { IDeleteTransactionDTO } from "../../dtos/IDeleteTransactionDTO";
import { TransactionRepository } from "../../repositories/transactionRepository";

export class DeleteTransaction {
  async execute({ user_id, transaction_id }: IDeleteTransactionDTO) {
    const transactionRepository = new TransactionRepository();

    await transactionRepository.deleteTransaction({
      user_id,
      transaction_id,
    });

    return await transactionRepository.getTransactions(user_id);
  }
}
