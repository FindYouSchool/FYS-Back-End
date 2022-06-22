import { Request, Response, Router } from "express";
import users from "./users";

const routes = Router();

routes.get("/", (req: Request, res: Response) => {
  res.json({ status: true, version: "1.0" });
});

routes.use("/users", users);

export default routes;
