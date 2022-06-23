import { Router } from "express";
import { NoticesController } from "../../controllers/public/NoticesController";
import { Container } from "../../lib/di";
import { controllerActionMiddleware } from "../../middewares/controllerActionMiddleware";

const routes = Router();

const controller =
  Container.getInstance().resolve<NoticesController>(NoticesController);

routes.get(
  "/school/:schoolid([0-9]+)",
  controllerActionMiddleware(controller, controller.getAll)
);

export default routes;
