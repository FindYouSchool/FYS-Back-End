import { Request, Response, Router } from "express";
import controller from "../controllers/UsersController";

const routes = Router();

routes.post("/", controller.create);

routes.get("/", controller.getAll.bind(controller));

export default routes;
