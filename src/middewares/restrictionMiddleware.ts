import { NextFunction, Request, Response } from "express";
import { HttpError } from "../errors";

export const restrictionMiddleware =
  (callback: (req: Request) => boolean, errorCallback: () => HttpError) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!callback(req)) {
        throw errorCallback();
      }
      next();
    } catch (error) {
      next(error);
    }
  };
