import { TransactionRepository } from "../../repositories/transactionRepository";

export class GetCategoriesCount {
  async execute() {
    const transactionRepository = new TransactionRepository();

    const transaction = await transactionRepository.getCategories();

    return transaction;
  }
}
