import { Router } from "express";
import criteria from "./criteria";
import users from "./users";

const routes = Router();

routes.use("/users", users);
routes.use("/criteria", criteria);

export default routes;
