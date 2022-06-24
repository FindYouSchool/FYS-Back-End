import { CriteriaMark } from "@prisma/client";

export class CriteriaMarkMode implements CriteriaMark {
  noticeAuthorId: number;
  noticeSchoolId: number;
  criteriaId: number;
  value: number;

  constructor(
    noticeAuthorId: number,
    noticeSchoolId: number,
    criteriaId: number,
    value: number
  ) {
    this.noticeAuthorId = noticeAuthorId;
    this.noticeSchoolId = noticeSchoolId;
    this.criteriaId = criteriaId;
    this.value = value;
  }
}
