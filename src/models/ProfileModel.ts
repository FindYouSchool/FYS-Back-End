import { Gender, Profile } from "@prisma/client";

export class ProfileModel
  implements Omit<Profile, "id" | "createdAt" | "updatedAt">
{
  firstName: string;
  lastName: string;
  gender: Gender;
  roleId: number;
  status: boolean;
  avatar: string | null;
  userId: number;

  constructor(
    firstName: string,
    lastName: string,
    gender: Gender,
    roleId: number,
    userId: number,
    avatar: string | null
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.gender = gender;
    this.roleId = roleId;
    this.userId = userId;
    this.avatar = avatar;
    this.status = false;
  }
}
