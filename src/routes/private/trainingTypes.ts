import { Router } from "express";

import { TrainingTypeController } from "../../controllers/private/TrainingTypeController";
import { Container } from "../../lib/di";
import { controllerActionMiddleware } from "../../middewares/controllerActionMiddleware";

const routes = Router();
const controller = Container.getInstance().resolve<TrainingTypeController>(
  TrainingTypeController
);

routes.get("/", controllerActionMiddleware(controller, controller.getAll));

export default routes;
