import { Request, Response } from "express";
import { BadRequestError, MissingRequiredParameterError } from "../../errors";
import { Container } from "../../lib/di";
import { NoticesRepository } from "../../services/NoticesRepository";
import { SchoolsRepository } from "../../services/SchoolsRepository";
import { HttpResponse } from "../../utils/HttpResponse";

export class SchoolsController {
  protected noticeRepository: NoticesRepository;
  protected repository: SchoolsRepository;
  protected schoolRepository: SchoolsRepository;

  constructor() {
    this.noticeRepository =
      Container.getInstance().resolve<NoticesRepository>(NoticesRepository);

    this.repository =
      Container.getInstance().resolve<SchoolsRepository>(SchoolsRepository);

    this.schoolRepository =
      Container.getInstance().resolve<SchoolsRepository>(SchoolsRepository);
  }

  async getAll(req: Request, res: Response) {
    const schools = await this.repository.getAll();
    return res.json(
      new HttpResponse({
        schools,
      })
    );
  }

  async filterByName(req: Request, res: Response) {
    const filterName = String(req.params.filterName).trim();

    if (!filterName.length) {
      return res.json({
        schools: [],
      });
    }

    const schools = await this.repository.filterByName(filterName);
    return res.json(
      new HttpResponse({
        schools,
      })
    );
  }

  async schoolGrade(req: Request, res: Response) {
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

    const grades = await this.noticeRepository.avgSchoolGrade(school.id);

    if (grades.length) {
      return res.json(
        new HttpResponse({
          ...school,
          rating: parseFloat(grades[0]._avg.value?.toFixed(1) ?? "0.0"),
        })
      );
    }

    return res.json(
      new HttpResponse({
        ...school,
        rating: 0.0,
      })
    );
  }
}
