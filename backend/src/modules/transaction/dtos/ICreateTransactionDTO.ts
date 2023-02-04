import { TypeTransaction } from "../entities/Type";

export interface ICreateTransactionDTO {
  type: TypeTransaction;
  date: Date;
  value: number;
  description: string;
  user_id: string;
  category_id: string;
}
