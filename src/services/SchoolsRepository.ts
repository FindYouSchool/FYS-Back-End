import { Role, School } from "@prisma/client";
import { BaseRepository } from "./BaseRepository";

export class SchoolsRepository extends BaseRepository {
  get collection() {
    return this.prisma.school;
  }

  async create(school: School): Promise<School> {
    return this.collection.create({ data: school });
  }

  async getAll(): Promise<School[]> {
    return this.collection.findMany({
      include: {
        sectors: {
          include: {
            sectorTrainingTypeImpacts: {
              include: {
                tranning: true,
              },
            },
          },
        },
        campus: true,
        domains: {
          include: {
            domain: true,
          },
        },
      },
    });
  }

  async getByName(name: string): Promise<School | null> {
    return this.collection.findUnique({
      where: {
        name,
      },
    });
  }
}
