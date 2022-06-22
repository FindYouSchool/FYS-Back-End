import { Request, Response, NextFunction, Router } from "express";
import controller from "../controllers/UsersController";
import { controllerActionMiddkeware } from "../middewares/controllerActionMiddkeware";

const routes = Router();

routes.post("/", controllerActionMiddkeware(controller, controller.create));

routes.get("/", controllerActionMiddkeware(controller, controller.getAll));

export default routes;
