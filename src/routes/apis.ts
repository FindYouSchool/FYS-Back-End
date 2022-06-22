import { Router } from "express";
import publicRoute from "./public";
import privateRoute from "./private";
import { authMiddleware } from "../middewares/authMiddleware";

const routes = Router();

// public route
routes.use("/public", publicRoute);

// public route
routes.use("/", [authMiddleware], privateRoute);

export default routes;
