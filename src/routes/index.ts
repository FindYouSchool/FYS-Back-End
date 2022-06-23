import { Request, Response, Router } from "express";
import apis from "./apis";

const routes = Router();

routes.get("/", (req: Request, res: Response) => {
  res.send('<h1>Please go to <a href="/api">api</a> to see all api route</h1>');
});

// Load api routes controllers
routes.use("/api", apis);

export default routes;
