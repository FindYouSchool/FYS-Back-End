import { Request, Response } from "express";

import { CriteriaRepository } from "../../services/CriteriaRepository";
import { Container } from "../../lib/di";

export class CriteriaController {
  protected repository: CriteriaRepository;

  constructor() {
    this.repository =
      Container.getInstance().resolve<CriteriaRepository>(CriteriaRepository);
  }

  async getAll(req: Request, res: Response) {
    const results = await this.repository.getAll();
    return res.json({
      users: results,
    });
  }
}
