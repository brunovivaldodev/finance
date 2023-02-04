import { TransactionRepository } from "../../repositories/transactionRepository";

export class GetTransactions {
  async execute(user_id: string) {
    const transactionRepository = new TransactionRepository();

    const transaction = await transactionRepository.getTransactions(user_id);

    return transaction;
  }
}
