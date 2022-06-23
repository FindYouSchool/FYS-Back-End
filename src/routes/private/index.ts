import { Router } from "express";
import criteria from "./criteria";
import users from "./users";
import trainingTypes from "./trainingTypes";

const routes = Router();

routes.use("/users", users);
routes.use("/criteria", criteria);
routes.use("/trainingTypes", trainingTypes);

export default routes;
