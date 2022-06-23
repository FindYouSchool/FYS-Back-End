import { Notice, Role, School } from "@prisma/client";
import { BaseRepository } from "./BaseRepository";

export class NoticesRepository extends BaseRepository {
  get collection() {
    return this.prisma.notice;
  }

  async create(school: Notice): Promise<Notice> {
    return this.collection.create({ data: school });
  }

  async avgSchoolGrade(schoolId: number) {
    return this.prisma.criteriaMark.groupBy({
      by: ["noticeSchoolId"],
      _avg: {
        value: true,
      },
      where: {
        notice: {
          schoolId,
        },
      },
    });
  }

  async getBySchoolId(
    schoolId: number
  ): Promise<Omit<Notice, "schoolId" | "authorId">[]> {
    return this.collection.findMany({
      select: {
        comment: true,
        createdAt: true,
        updatedAt: true,
        author: {
          select: {
            firstName: true,
            lastName: true,
            avatar: true,
            role: {
              select: {
                name: true,
              },
            },
          },
        },
        criteriaMarks: {
          select: {
            criteria: {
              select: {
                name: true,
              },
            },
            value: true,
          },
        },
      },
      where: {
        schoolId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }
}
