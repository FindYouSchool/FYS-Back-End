import { CriteriaMark, Prisma } from "@prisma/client";
import { BaseRepository } from "./BaseRepository";

export class CriteriaMarkRepository extends BaseRepository {
  get collection() {
    return this.prisma.criteriaMark;
  }

  async createMany(data: Array<CriteriaMark>): Promise<Prisma.BatchPayload> {
    return this.collection.createMany({
      data,
    });
  }

  async deleteMany(
    where: Pick<CriteriaMark, "noticeAuthorId" | "noticeSchoolId">
  ): Promise<Prisma.BatchPayload> {
    return this.collection.deleteMany({
      where,
    });
  }
}
