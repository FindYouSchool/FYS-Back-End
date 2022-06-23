import { PrismaClient } from "@prisma/client";
import { Container } from "../lib/di";

export abstract class BaseRepository {
  protected prisma: PrismaClient;

  constructor() {
    this.prisma = Container.getInstance().resolve<PrismaClient>(PrismaClient);
  }
}
