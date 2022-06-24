import { Router } from "express";
import { SchoolsController } from "../../controllers/public/SchoolsController";
import { Container } from "../../lib/di";
import { controllerActionMiddleware } from "../../middewares/controllerActionMiddleware";

const routes = Router();

const controller =
  Container.getInstance().resolve<SchoolsController>(SchoolsController);

routes.get("/", controllerActionMiddleware(controller, controller.getAll));

routes.get(
  "/:filterName",
  controllerActionMiddleware(controller, controller.filterByName)
);

routes.get(
  "/:schoolid([0-9]+)/grade",
  controllerActionMiddleware(controller, controller.schoolGrade)
);

export default routes;
