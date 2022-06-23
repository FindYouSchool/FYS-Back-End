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

  async filterByName(filterName: string): Promise<School[] | null> {
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
      where: {
        name: {
          contains: filterName,
          mode: "insensitive",
        },
      },
      take: 20,
    });
  }

  async getById(id: number): Promise<Pick<School, "id" | "name"> | null> {
    return this.collection.findUnique({
      select: {
        id: true,
        name: true,
      },
      where: {
        id,
      },
    });
  }
}
