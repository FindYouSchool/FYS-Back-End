import { Role } from "@prisma/client";
import { BaseRepository } from "./BaseRepository";

export class RoleRepository extends BaseRepository {
  get collection() {
    return this.prisma.role;
  }

  async create(role: Role): Promise<Role> {
    return this.collection.create({ data: role });
  }

  async getAll(): Promise<Role[]> {
    return this.collection.findMany();
  }

  async get(name: string): Promise<Role | null> {
    return this.collection.findUnique({
      where: {
        name,
      },
    });
  }
}
