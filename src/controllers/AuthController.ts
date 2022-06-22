import { Request, Response } from "express";
import { UsersRepository } from "../services/UsersRepository";
import { Container } from "../lib/di";

export class AuthController {
  protected repository: UsersRepository;

  constructor() {
    this.repository =
      Container.getInstance().resolve<UsersRepository>(UsersRepository);
  }

  async login(req: Request, res: Response) {
    res.json({});
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
