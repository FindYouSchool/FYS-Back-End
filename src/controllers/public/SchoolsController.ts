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

  async filterByName(req: Request, res: Response) {
    const filterName = String(req.params.filterName).trim();

    if (!filterName.length) {
      return res.json({
        schools: [],
      });
    }

    const schools = await this.repository.filterByName(filterName);
    return res.json({
      schools,
    });
  }
}
