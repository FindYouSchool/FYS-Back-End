import { PrismaService } from "./PrismaService";

export abstract class BaseRepository {
  protected prisma: PrismaService;

  constructor() {
    this.prisma = PrismaService.getInstance();
  }
}
