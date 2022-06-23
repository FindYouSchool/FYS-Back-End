/**
 * @interface HttpErrorOption
 */
export interface HttpErrorOption {
  readonly message: string;
  readonly type: string;
  readonly status: number;
  readonly info?: object;
  readonly expose?: boolean;
}

/**
 * @class HttpError
 */
export class HttpError extends Error implements HttpErrorOption {
  public readonly type: string;
  public readonly status: number;
  public readonly isHttpError: boolean;
  public readonly info?: object;
  public readonly expose?: boolean;

  constructor({
    type = "unknown_error",
    message,
    status = 400,
    info = undefined,
    expose = true,
  }: HttpErrorOption) {
    super(message);
    this.type = type;
    this.status = status;
    this.info = info;
    this.expose = expose;
    this.isHttpError = true;

    Error.captureStackTrace(this, this.constructor);
  }

  get name(): string {
    return this.constructor.name;
  }

  public toJSON = (): object => ({
    type: this.type,
    message: this.expose ? this.message : undefined,
    info: this.info,
    success: false,
    status: this.status,
  });
}

export default HttpError;
