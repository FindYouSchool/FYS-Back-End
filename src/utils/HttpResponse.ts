/**
 * @interface HttpResponseOption
 */
export interface HttpResponseOption<T> {
  readonly data?: T;
  readonly message?: string;
  readonly status?: number;
  readonly success?: boolean;
  readonly type?: string;
}

/**
 * @interface HttpResponseAny
 */
export type HttpResponseAny = HttpResponseOption<any>;

/**
 * @class HttpResponse
 */
export class HttpResponse<T> implements HttpResponseOption<T> {
  readonly data: T | undefined;
  readonly message?: string | undefined;
  readonly status?: number;
  readonly success?: boolean;
  readonly type?: string;

  constructor(
    data: T,
    message?: string,
    success: boolean | undefined = true,
    status?: number | undefined,
    type?: string
  ) {
    this.data = data ?? undefined;
    this.message = message ?? undefined;
    this.status = status ?? undefined;
    this.success = success === undefined ? false : success;

    if (status != undefined) {
      if ((this.success && status >= 400) || (!this.success && status < 400)) {
        throw new Error(
          'invalid status code: "' +
            status +
            '" because a http status is ' +
            String(this.success)
        );
      } else {
        this.status = status ? status : this.success ? 200 : 400;
      }
    }
    if (!this.success) {
      this.type = type;
    }
  }

  public toJSON = (): HttpResponseAny => ({
    data: this.data,
    message: this.message,
    success: this.success,
    status: this.status,
    type: this.type,
  });
}
