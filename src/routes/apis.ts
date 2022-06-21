import { Request, Response, Router } from "express";

const routes = Router();

routes.get("/", (req: Request, res: Response) => {
  res.json({ status: true, version: "1.0" });
});

export default routes;
