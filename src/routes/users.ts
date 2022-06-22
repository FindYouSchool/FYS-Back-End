import { Request, Response, NextFunction, Router } from "express";
import controller from "../controllers/UsersController";
import { controllerActionMiddleware } from "../middewares/controllerActionMiddleware";

const routes = Router();

routes.post("/", controllerActionMiddleware(controller, controller.create));

routes.get("/", controllerActionMiddleware(controller, controller.getAll));

export default routes;
