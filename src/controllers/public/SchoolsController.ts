import { Request, Response } from "express";
import { Container } from "../../lib/di";
import { SchoolsRepository } from "../../services/SchoolsRepository";

export class SchoolsController {
  protected repository: SchoolsRepository;

  constructor() {
    this.repository =
      Container.getInstance().resolve<SchoolsRepository>(SchoolsRepository);
  }

  async getAll(req: Request, res: Response) {
    const schools = await this.repository.getAll();
    return res.json({
      schools,
    });
  }
}
