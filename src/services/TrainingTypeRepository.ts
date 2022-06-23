import { TrainingType } from "@prisma/client";
import { isAnyArrayBuffer } from "util/types";
import { BaseRepository } from "./BaseRepository";

export class TrainingTypeRepository extends BaseRepository {
  get collection() {
    return this.prisma.trainingType;
  }

  async create(trainingType: TrainingType): Promise<TrainingType> {
    return this.collection.create({ data: trainingType });
  }

  async getAll(): Promise<TrainingType[]> {
    return this.collection.findMany({
      include: {
        sectors: true,
        sectorTrainingTypeImpacts: true,
        schoolTrainingTypes: true,
      },
    });
  }
}
