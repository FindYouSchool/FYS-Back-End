import { Router } from "express";
import auth from "./auth";
import schools from "./schools";

const routes = Router();

routes.use("/auth", auth);

routes.use("/schools", schools);

export default routes;
