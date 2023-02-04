import AppError from "../../../../app-error";
import { ICreateTransactionDTO } from "../../dtos/ICreateTransactionDTO";
import { TypeTransaction } from "../../entities/Type";
import { TransactionRepository } from "../../repositories/transactionRepository";

export class CreateTransaction {
  async execute({
    date,
    description,
    type,
    value,
    user_id,
    category_id,
  }: ICreateTransactionDTO) {
    const transactionRepository = new TransactionRepository();

    if (!(type in TypeTransaction)) {
      return new AppError("Invalid Transaction Type");
    }

    const transaction = transactionRepository.createTransaction({
      date,
      description,
      type,
      value,
      user_id,
      category_id,
    });

    return transaction;
  }
}
