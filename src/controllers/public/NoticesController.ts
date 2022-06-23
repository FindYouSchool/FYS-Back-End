import { Request, Response } from "express";
import { BadRequestError, MissingRequiredParameterError } from "../../errors";
import { Container } from "../../lib/di";
import { NoticesRepository } from "../../services/NoticesRepository";
import { SchoolsRepository } from "../../services/SchoolsRepository";

export class NoticesController {
  protected noticeRepository: NoticesRepository;
  protected schoolRepository: SchoolsRepository;

  constructor() {
    this.noticeRepository =
      Container.getInstance().resolve<NoticesRepository>(NoticesRepository);

    this.schoolRepository =
      Container.getInstance().resolve<SchoolsRepository>(SchoolsRepository);
  }

  async getAll(req: Request, res: Response) {
    //
    const schoolId = Number(req.params.schoolid);
    if (isNaN(schoolId)) {
      throw new MissingRequiredParameterError();
    }

    const school = await this.schoolRepository.getById(schoolId);

    if (!school) {
      throw new BadRequestError(`No school corresponds to id ${schoolId}`, {
        schoolId,
      });
    }

    const a = (await this.noticeRepository.avgSchoolGrade(school.id))[0];

    const notices = await this.noticeRepository.getBySchoolId(school.id);

    return res.json({
      ...school,
      rating: parseFloat(a._avg.value?.toFixed(1) ?? "0.0"),
      notices,
    });
  }
}
