import { User } from "@prisma/client";

export class UserModel implements Omit<User, "id" | "createdAt" | "updatedAt"> {
  password: string;
  email: string;
  username: string;
  verified: boolean;
  disabled: boolean;

  constructor(username: string, email: string, password: string) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.verified = false;
    this.disabled = false;
  }
}
