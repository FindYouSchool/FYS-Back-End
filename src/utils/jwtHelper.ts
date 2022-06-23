import { Request } from "express";
import * as jwt from "jsonwebtoken";
import { jwtConfig } from "../configs/jwtConfig";
import { ExpiredTokenError, InvalidTokenError } from "../errors";

/**
 * @interface JwtPayload
 */
export interface JwtPayload {
  userId: number;
  email: string;
  xsrfToken: string;
}

export function getTokenFromHeader(
  req: Request,
  {
    headerType,
    requireBearer,
  }: {
    headerType?: string;
    requireBearer?: boolean;
  } = {
    requireBearer: false,
  }
): string | undefined | null {
  try {
    const authHeader: string =
      req.headers[headerType ?? "authorization"]?.toString() ?? "";

    if (authHeader) {
      if (requireBearer) {
        const [type, token] = authHeader.split(" ");
        return type === "Bearer" ? token : null;
      }
      return authHeader;
    }
    return undefined;
  } catch (err: any) {
    console.error(`jwt token not found in request header - ${err.message}`);
    return null;
  }
}

function getAlgorith(): jwt.Algorithm {
  return jwtConfig.accessToken.algorithm !== undefined
    ? (jwtConfig.accessToken.algorithm as jwt.Algorithm)
    : "HS256";
}

export async function encode<T extends object>(
  data: T,
  secretKey: string,
  duration?: string | number
): Promise<string> {
  return new Promise((resolve, reject) => {
    jwt.sign(
      data,
      secretKey,
      {
        algorithm: getAlgorith(),
        expiresIn: duration ?? "5m",
      },
      (err, token) => {
        if (token && !err) return resolve(token);
        reject(err);
      }
    );
  });
}

export async function decode<T>(
  token: string,
  secretKey: string
): Promise<T | undefined | null> {
  try {
    return await new Promise((resolve, reject) => {
      jwt.verify(
        token,
        secretKey,
        {
          algorithms: [getAlgorith()],
        },
        (err, decoded) => {
          if (!err && decoded && typeof decoded === "object")
            return resolve(decoded as unknown as T);
          reject(err);
        }
      );
    });
  } catch (err: any) {
    console.log(`decoding of the jwt token failed - ${err.message}`);

    if (err.name === "TokenExpiredError") {
      throw new ExpiredTokenError("Expired token", {
        expiredAt: err.expiredAt,
      });
    } else if (err.name === "JsonWebTokenError") {
      throw new InvalidTokenError(err.message);
    }

    return undefined;
  }
}

export function decodedAccessToken<T>(
  jwToken: string
): Promise<T | undefined | null> {
  return decode<T>(jwToken, jwtConfig.accessToken.secret);
}

export default { getTokenFromHeader, encode, decode, decodedAccessToken };
