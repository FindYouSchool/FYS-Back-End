import { Request, Response } from "express";
import { UsersRepository } from "../services/UsersRepository";
import { Container } from "../lib/di";
import { ILoginString } from "../interface/ILoginString";
import {
  BadCredentialsError,
  BadRequestError,
  MissingRequiredParameterError,
  UnauthorizedError,
} from "../errors";
import passcrypt from "../utils/passcrypt";
import jwtHelper, { JwtPayload } from "../utils/jwtHelper";
import tokenHelper from "../utils/tokenHelper";
import { jwtConfig } from "../configs/jwtConfig";
import { HttpResponse } from "../utils/HttpResponse";
import IUserString from "../interface/IUserString";
import { UserModel } from "../models/UserModel";

export class AuthController {
  protected repository: UsersRepository;

  constructor() {
    this.repository =
      Container.getInstance().resolve<UsersRepository>(UsersRepository);
  }

  async login(req: Request, res: Response) {
    const { email, password, remember } = req.body as ILoginString;

    if (!(email && password)) {
      throw new BadCredentialsError();
    }

    const user = await this.repository.get(email);

    if (!user) {
      throw new UnauthorizedError("invalid email or password");
    }

    if (!(await passcrypt.checkPasswordIsValid(user.password, password))) {
      throw new UnauthorizedError("invalid email or password");
    }

    // XSRF Token
    const xsrfToken = await tokenHelper.generatedToken(32, { take: 32 });

    // Access Token
    const accessToken = await jwtHelper.encode<JwtPayload>(
      { userId: user.id, email: user.email, xsrfToken },
      jwtConfig.accessToken.secret,
      jwtConfig.accessToken.expiresIn
    );

    // Access Token
    const refreshToken = await jwtHelper.encode<JwtPayload>(
      { userId: user.id, email: user.email, xsrfToken },
      jwtConfig.refreshToken.secret,
      remember
        ? jwtConfig.refreshToken.rememberExpiresIn
        : jwtConfig.refreshToken.expiresIn
    );

    res.json(
      new HttpResponse({
        xsrfToken,
        accessToken,
        refreshToken,
      })
    );
  }

  async register(req: Request, res: Response) {
    const { email, password, username } = req.body as IUserString;

    if (!(email && password && username)) {
      throw new MissingRequiredParameterError();
    }

    const user = await this.repository.get(email);

    if (user) {
      throw new BadRequestError("user alrady exist");
    }

    const hashedPassword = await passcrypt.hashPassword(password);
    const newUser = new UserModel(username, email, hashedPassword);
    const result = await this.repository.create(newUser);

    // XSRF Token
    const xsrfToken = await tokenHelper.generatedToken(32, { take: 32 });

    // Access Token
    const accessToken = await jwtHelper.encode<JwtPayload>(
      { userId: result.id, email: result.email, xsrfToken },
      jwtConfig.accessToken.secret,
      jwtConfig.accessToken.expiresIn
    );

    // Access Token
    const refreshToken = await jwtHelper.encode<JwtPayload>(
      { userId: result.id, email: result.email, xsrfToken },
      jwtConfig.refreshToken.secret,
      jwtConfig.refreshToken.expiresIn
    );

    return res.json(
      new HttpResponse(
        {
          xsrfToken,
          accessToken,
          refreshToken,
          user: {
            id: result.id,
            email: result.email,
            username: result.username,
          },
        },
        "user create !"
      )
    );
  }

  async forgetPassword(req: Request, res: Response) {
    res.json({});
  }

  async resetPassword(req: Request, res: Response) {
    res.json({});
  }

  async refreshToken(req: Request, res: Response) {
    res.json({});
  }
}
