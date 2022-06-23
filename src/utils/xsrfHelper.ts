import { Request } from "express";

export function getXsrfToken(
  req: Request,
  key?: string
): string | undefined | null {
  try {
    return req.headers[key ?? "x-xsrf-token"]?.toString() ?? undefined;
  } catch (err: any) {
    console.log(`xsrf token not found in request header - ${err.message}`);
    return null;
  }
}

export default { getXsrfToken };
