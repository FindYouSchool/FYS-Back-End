import { Criteria } from "@prisma/client";
import { BaseRepository } from "./BaseRepository";

export class CriteriaRepository extends BaseRepository {
  get collection() {
    return this.prisma.criteria;
  }

  async getAll(): Promise<Omit<Criteria, "description">[]> {
    return this.collection.findMany({
      select: {
        id: true,
        name: true,
      },
    });
  }
}
