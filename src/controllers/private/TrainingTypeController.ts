import { Request, Response } from "express";

import { TrainingTypeRepository } from "../../services/TrainingTypeRepository";
import { Container } from "../../lib/di";

export class TrainingTypeController {
  protected repository: TrainingTypeRepository;

  constructor() {
    this.repository = Container.getInstance().resolve<TrainingTypeRepository>(
      TrainingTypeRepository
    );
  }

  async getAll(req: Request, res: Response) {
    const results = await this.repository.getAll();
    return res.json({
      trainingTypes: results,
    });
  }
}
