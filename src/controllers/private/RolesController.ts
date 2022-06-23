import { Request, Response } from "express";
import { Container } from "../../lib/di";
import { RoleRepository } from "../../services/RoleRepository";
export class RolesController {
  protected repository: RoleRepository;

  constructor() {
    this.repository =
      Container.getInstance().resolve<RoleRepository>(RoleRepository);
  }

  async getAll(req: Request, res: Response) {
    const results = await this.repository.getAll();
    return res.json({
      users: results,
    });
  }
}
