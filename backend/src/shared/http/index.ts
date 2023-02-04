import { Router } from "express";
import { UserRoutes } from "./users.routes";
import { TransactionRouter } from "./transaction.routes";
import { CategoriesRouter } from "./categories.routes";

const Routes = Router();

Routes.use("/users", UserRoutes);
Routes.use("/transactions", TransactionRouter);
Routes.use("/categories", CategoriesRouter);

export { Routes };
