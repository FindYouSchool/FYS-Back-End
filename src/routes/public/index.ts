import { Router } from "express";
import auth from "./auth";
import schools from "./schools";
import notices from "./notices";

const routes = Router();

routes.use("/auth", auth);

routes.use("/schools", schools);
routes.use("/notices", notices);

export default routes;
