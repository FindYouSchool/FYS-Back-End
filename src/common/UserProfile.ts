import { Profile, User } from "@prisma/client";

export type UserProfile = Omit<User, "password" | "updatedAt"> & {
  profile: Profile | null;
};
