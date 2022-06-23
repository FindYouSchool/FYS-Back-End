import { Profile } from "@prisma/client";
import { BaseRepository } from "./BaseRepository";

export class ProfileRepository extends BaseRepository {
  get collection() {
    return this.prisma.profile;
  }

  async create(
    profile: Omit<Profile, "id" | "createdAt" | "updatedAt">
  ): Promise<Profile> {
    return this.collection.create({ data: profile });
  }

  async geByUserId(userId: number, joinUser = false): Promise<Profile | null> {
    return this.collection.findUnique({
      where: {
        userId,
      },
    });
  }
}
