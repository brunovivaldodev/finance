import { Router } from "express";
import CreateUserController from "../../modules/users/UseCases/createUser/createUserController";
import AuthenticateController from "../../modules/users/UseCases/authenticate/authenticateUserController";

const UserRoutes = Router();

UserRoutes.post("", CreateUserController.handle);
UserRoutes.post("/authenticate", AuthenticateController.handle);

export { UserRoutes };
