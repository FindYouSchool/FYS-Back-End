import { Router } from "express";

import { CriteriaController } from "../../controllers/private/CriteriaController";
import { Container } from "../../lib/di";
import { controllerActionMiddleware } from "../../middewares/controllerActionMiddleware";

const routes = Router();
const controller =
  Container.getInstance().resolve<CriteriaController>(CriteriaController);

routes.get("/", controllerActionMiddleware(controller, controller.getAll));

export default routes;
