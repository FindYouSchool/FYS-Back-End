import { Router } from "express";
import { RolesController } from "../../controllers/private/RolesController";
import { Container } from "../../lib/di";
import { controllerActionMiddleware } from "../../middewares/controllerActionMiddleware";

const routes = Router();
const controller =
  Container.getInstance().resolve<RolesController>(RolesController);

routes.get("/", controllerActionMiddleware(controller, controller.getAll));

export default routes;
