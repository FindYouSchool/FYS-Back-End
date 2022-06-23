import { Criteria } from "@prisma/client";
import { BaseRepository } from "./BaseRepository";

export class CriteriaRepository extends BaseRepository {
  get collection() {
    return this.prisma.criteria;
  }

  async create(criteria: Omit<Criteria, "id">): Promise<Criteria> {
    return this.collection.create({ data: criteria });
  }

  async getAll() {
    return this.collection.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        criteriaMarks: true,
      },
    });
  }
}
