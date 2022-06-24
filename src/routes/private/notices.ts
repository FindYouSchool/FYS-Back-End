import { Router } from "express";
import { NoticesController } from "../../controllers/private/NoticesController";
import { Container } from "../../lib/di";
import { controllerActionMiddleware } from "../../middewares/controllerActionMiddleware";

const routes = Router();

const controller =
  Container.getInstance().resolve<NoticesController>(NoticesController);

routes.post(
  "/school/:schoolid([0-9]+)",
  controllerActionMiddleware(controller, controller.create)
);

export default routes;
