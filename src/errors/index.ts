import HttpError, { HttpErrorOption } from "./HttpError";

/**
 * @class MissingRequiredParameterError
 */
export class MissingRequiredParameterError extends HttpError {
  constructor(message = "Missing required parameters", info?: object) {
    super({ type: "missing_required_parameter", message, info, status: 400 });
  }
}

/**
 * @class BadRequestError
 */
export class BadRequestError extends HttpError {
  constructor(message = "Bad request", info?: object) {
    super({ type: "bad_request", message, info, status: 400 });
  }
}

/**
 * @class ValidationError
 */
export class ValidationError extends HttpError {
  constructor(message = "Invalid parameters", info?: object) {
    super({ type: "missing_required_parameter", message, info, status: 400 });
  }
}

/**
 * @class UnauthorizedError
 */
export class UnauthorizedError extends HttpError {
  constructor(message = "Unauthorized", info?: object) {
    super({ type: "unauthorized", message, info, status: 401 });
  }
}

/**
 * @class BadCredentialsError
 */
export class BadCredentialsError extends HttpError {
  constructor(message = "Bad credentials", info?: object) {
    super({ type: "bad_credentials", message, info, status: 401 });
  }
}

/**
 * @class InvalidTokenError
 */
export class InvalidTokenError extends HttpError {
  constructor(message = "Invalid token", info?: object) {
    super({ type: "invalid_token", message, info, status: 401 });
  }
}

/**
 * @class ForbiddenError
 */
export class ForbiddenError extends HttpError {
  constructor(
    message = "User is not allowed access the endpoint",
    info?: object
  ) {
    super({ type: "forbidden", message, info, status: 403 });
  }
}

/**
 * @class NotFoundError
 */
export class NotFoundError extends HttpError {
  constructor(message = "Endpoint cannot be found.", info?: object) {
    super({ type: "not_found", message, info, status: 404 });
  }
}

/**
 * @class InternalServerError
 */
export class InternalServerError extends HttpError {
  constructor(message = "Internal error server", info?: object) {
    super({
      type: "internal_server",
      message,
      info,
      status: 500,
      expose: false,
    });
  }
}

export type { HttpErrorOption };
export { HttpError };
export default {
  HttpError,
  MissingRequiredParameterError,
  BadCredentialsError,
  InvalidTokenError,
  InternalServerError,
  ValidationError,
  ForbiddenError,
  NotFoundError,
  UnauthorizedError,
  BadRequestError,
};
