import { Router } from "express";
import { CreateCategoryController } from "../../modules/transaction/useCases/createCategory/createCategoryController";
import { CreateTransactionController } from "../../modules/transaction/useCases/createTransaction/createTransactionController";
import { GetTransactionController } from "../../modules/transaction/useCases/getTransactions/getTransactionsController";
import { GetCategoriesController } from "../../modules/transaction/useCases/getCategories/getCategoriesController";
import { DeleteTransactionController } from "../../modules/transaction/useCases/deleteTransaction/deleteTransactionController";

const TransactionRouter = Router();

TransactionRouter.post("/:user_id", CreateTransactionController.handle);
TransactionRouter.get("/:user_id", GetTransactionController.handle);
TransactionRouter.delete(
  "/:transaction_id/:user_id",
  DeleteTransactionController.handle
);

TransactionRouter.get("/categories:user_id", GetCategoriesController.handle);
TransactionRouter.post("/category:user_id", CreateCategoryController.handle);

export { TransactionRouter };
