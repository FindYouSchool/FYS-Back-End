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

  async getAll(): Promise<Omit<User, "password" | "updatedAt">[]> {
    return this.collection.findMany({
      select: {
        id: true,
        email: true,
        username: true,
        disabled: true,
        verified: true,
        createdAt: true,
      },
    });
  }

  async get(email: string): Promise<User | null> {
    return this.collection.findUnique({
      where: {
        email,
      },
    });
  }
}
