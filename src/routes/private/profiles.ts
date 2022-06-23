import { Router } from "express";
import { ProfileController } from "../../controllers/private/ProfileController";
import { Container } from "../../lib/di";
import { controllerActionMiddleware } from "../../middewares/controllerActionMiddleware";

const routes = Router();
const controller =
  Container.getInstance().resolve<ProfileController>(ProfileController);

routes.get("/", controllerActionMiddleware(controller, controller.get));

routes.post("/", controllerActionMiddleware(controller, controller.create));

export default routes;
