import { Notice } from "@prisma/client";

export class NoticeModel implements Omit<Notice, "updatedAt" | "createdAt"> {
  readonly comment: string;
  readonly authorId: number;
  readonly schoolId: number;

  constructor(comment: string, authorId: number, schoolId: number) {
    this.comment = comment;
    this.authorId = authorId;
    this.schoolId = schoolId;
  }
}
