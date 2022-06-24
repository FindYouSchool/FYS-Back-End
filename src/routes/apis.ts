import { Request, Response, Router } from "express";
import publicRoute from "./public";
import privateRoute from "./private";
import { authMiddleware } from "../middewares/authMiddleware";

const routes = Router();

routes.get("/health", (req: Request, res: Response) => {
  res.json({
    date: Date.now(),
    version: "v1",
  });
});

// public route
routes.use("/public", publicRoute);

// public route
routes.use("/", [authMiddleware], privateRoute);

export default routes;
