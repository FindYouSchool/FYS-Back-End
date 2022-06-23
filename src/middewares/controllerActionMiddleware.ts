import { Request, Response, NextFunction } from "express";

export const controllerActionMiddleware =
  <T extends Object>(instance: T, func: Function) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await func.apply(instance, [req, res]);
    } catch (err) {
      next(err);
    }
  };
