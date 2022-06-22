import { PrismaClient } from "@prisma/client";

export class PrismaService extends PrismaClient {
  private static _instance: PrismaService;

  private constructor() {
    super();
  }

  public static getInstance(): PrismaService {
    if (!PrismaService._instance) {
      PrismaService._instance = new PrismaService();
    }

    return PrismaService._instance;
  }
}
