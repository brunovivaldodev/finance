import { getRepository, Repository } from "typeorm";
import { Users } from "../../users/entities/User";
import { ICreateTransactionDTO } from "../dtos/ICreateTransactionDTO";
import { IDeleteTransactionDTO } from "../dtos/IDeleteTransactionDTO";
import { Categories } from "../entities/Categories";
import Transaction from "../entities/Transaction";

export class TransactionRepository extends Repository<Transaction> {
  transactionRepository: Repository<Transaction>;
  usersRepository: Repository<Users>;
  categoriesRepository: Repository<Categories>;

  constructor() {
    super();
    this.transactionRepository = getRepository(Transaction);
    this.usersRepository = getRepository(Users);
    this.categoriesRepository = getRepository(Categories);
  }

  public async deleteTransaction({
    transaction_id,
    user_id,
  }: IDeleteTransactionDTO) {
    const transaction = await this.transactionRepository.findOne({
      where: { user: user_id, id: transaction_id },
    });

    if (transaction) {
      this.transactionRepository.delete(transaction_id);
    }
  }

  public async createTransaction({
    date,
    description,
    type,
    value,
    user_id,
    category_id,
  }: ICreateTransactionDTO) {
    const user = await this.usersRepository.findOne(user_id);
    const category = await this.categoriesRepository.findOne(category_id);

    if (!user) {
      throw new Error("user does not exists");
    }
    if (!category) {
      throw new Error("category does not exists");
    }

    const transaction = this.transactionRepository.create({
      date,
      type,
      description,
      value,
      user: user,
      category: category,
    });

    await this.transactionRepository.save(transaction);

    return transaction;
  }

  public async getTransactions(user_id: string) {
    const transactions = await this.transactionRepository.find({
      where: { user: user_id },
    });

    return transactions;
    
  }

  public async getCategories() {


    const transaction = await this.transactionRepository
    .createQueryBuilder()
    .relation(Categories, "categories")
    .add(5)
  

  return transaction
}
}
