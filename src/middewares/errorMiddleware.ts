import express, { NextFunction, Request, Response } from "express";
import {
  BadRequestError,
  HttpError,
  InternalServerError,
  UnauthorizedError,
} from "../errors";

export async function errorMiddleware(
  error: HttpError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!error.isHttpError) {
    switch (true) {
      case error.name === "CastError":
      case error.name === "ValidationError":
        error = new BadRequestError(error.message);
        break;
      case error.name === "UnauthorizedError":
        error = new UnauthorizedError(error.message);
        break;
      default:
        error = new InternalServerError(
          error.message ??
            "the server has encountered an inappropriate problem."
        );
    }

    if (!error.isHttpError) console.log("Error", error);
  }

  if (res.headersSent) {
    return next(error);
  }

  res.status(error.status).json(error);
}
