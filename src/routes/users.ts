import { Router } from "express";
import { UsersController } from "../controllers/UsersController";
import { Container } from "../lib/di";
import { controllerActionMiddleware } from "../middewares/controllerActionMiddleware";

const routes = Router();
const controller =
  Container.getInstance().resolve<UsersController>(UsersController);

routes.get("/", controllerActionMiddleware(controller, controller.getAll));

export default routes;
