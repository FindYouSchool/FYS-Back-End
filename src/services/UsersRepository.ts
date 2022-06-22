import { User } from "@prisma/client";
import { BaseRepository } from "./BaseRepository";

export class UsersRepository extends BaseRepository {
  get collection() {
    return this.prisma.user;
  }

  async create(
    user: Omit<User, "id" | "createdAt" | "updatedAt">
  ): Promise<User> {
    return this.collection.create({ data: user });
  }

  async getAll(): Promise<User[]> {
    return this.collection.findMany();
  }
}
