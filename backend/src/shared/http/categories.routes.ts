import { Router } from "express";
import { CreateCategoryController } from "../../modules/transaction/useCases/createCategory/createCategoryController";
import { GetCategoriesController } from "../../modules/transaction/useCases/getCategories/getCategoriesController";

const CategoriesRouter = Router();

CategoriesRouter.get("/:user_id", GetCategoriesController.handle);
CategoriesRouter.post("/:user_id", CreateCategoryController.handle);

export { CategoriesRouter };
