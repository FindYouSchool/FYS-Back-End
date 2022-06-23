import * as bcrypt from "bcryptjs";

export async function hashPassword(
  password: string,
  salt = 8
): Promise<string> {
  return bcrypt.hash(password, salt);
}

export async function checkPasswordIsValid(
  hashedPassword: string,
  password: string
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

export default { hashPassword, checkPasswordIsValid };
