import { Router } from "express";
import { SchoolsController } from "../../controllers/public/SchoolsController";
import { Container } from "../../lib/di";
import { controllerActionMiddleware } from "../../middewares/controllerActionMiddleware";

const routes = Router();

const controller =
  Container.getInstance().resolve<SchoolsController>(SchoolsController);

routes.get("/", controllerActionMiddleware(controller, controller.getAll));

export default routes;
