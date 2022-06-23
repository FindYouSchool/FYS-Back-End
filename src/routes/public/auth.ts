import { Router } from "express";
import { AuthController } from "../../controllers/public/AuthController";
import { Container } from "../../lib/di";
import { controllerActionMiddleware } from "../../middewares/controllerActionMiddleware";

const routes = Router();
const controller =
  Container.getInstance().resolve<AuthController>(AuthController);

routes.post("/login", controllerActionMiddleware(controller, controller.login));

routes.post(
  "/register",
  controllerActionMiddleware(controller, controller.register)
);

export default routes;
