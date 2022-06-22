import express, { NextFunction, Request, Response } from "express";
import { HttpError, NotFoundError } from "../errors";

export async function notFoundMiddleware(
  error: HttpError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  return next(
    new NotFoundError(`Can't find ${req.originalUrl} on this server!`)
  );
}
