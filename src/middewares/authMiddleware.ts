import { NextFunction, Request, Response } from "express";
import { ForbiddenError, HttpError, UnauthorizedError } from "../errors";
import { Container } from "../lib/di";
import { UsersRepository } from "../services/UsersRepository";
import jwtHelper, { JwtPayload } from "../utils/jwtHelper";
import xsrfHelper from "../utils/xsrfHelper";

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // Check that the access token is present in request header
    const accessToken = jwtHelper.getTokenFromHeader(req, {
      requireBearer: true,
    });

    if (!accessToken) {
      throw new UnauthorizedError("Missing JWT token in headers");
    }

    // Retrieve the xsrf tokeem from request header
    const xsrfToken = xsrfHelper.getXsrfToken(req, "x-xsrf-token");

    if (!xsrfToken) {
      throw new ForbiddenError("Missing XSRF token in headers");
    }

    // Check payload is valid
    const payload = await jwtHelper.decodedAccessToken<JwtPayload>(accessToken);

    if (!payload) {
      throw new UnauthorizedError(
        "Access is denied due to invalid credentials"
      );
    }

    // Check xsrf token
    if (payload.xsrfToken !== xsrfToken) {
      throw new ForbiddenError("Bad xsrf token", {
        type: "CSRF",
      });
    }

    // Check that the user exist in our database
    const user = await Container.getInstance()
      .resolve<UsersRepository>(UsersRepository)
      .getAccount(payload.email);

    if (!user) {
      throw new UnauthorizedError(`User ${payload.email} not exists`);
    }
    // Check that the user account in health
    if (!!user.disabled) {
      throw new ForbiddenError("Access is denied for account restriction");
    }

    // Save authenticated user to response
    req.getUserAuth = () => {
      return user;
    };

    // No error we continue to next middleware
    next();
  } catch (error) {
    next(error);
  }
}
