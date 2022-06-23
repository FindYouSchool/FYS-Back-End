import { Request, Response } from "express";
import { UsersRepository } from "../../services/UsersRepository";
import { Container } from "../../lib/di";
export class UsersController {
  protected repository: UsersRepository;

  constructor() {
    this.repository =
      Container.getInstance().resolve<UsersRepository>(UsersRepository);
  }

  async getAll(req: Request, res: Response) {
    const results = await this.repository.getAll();
    return res.json({
      users: results,
    });
  }
}
