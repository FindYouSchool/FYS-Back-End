import { Request, Response } from "express";
import { UserProfile } from "../../common/UserProfile";
import {
  BadRequestError,
  ForbiddenError,
  MissingRequiredParameterError,
} from "../../errors";
import { NoticeString } from "../../interface/NoticeString";
import { Container } from "../../lib/di";
import { CriteriaMarkMode } from "../../models/CriteriaMarkMode";
import { NoticeModel } from "../../models/NoticeModel";
import { CriteriaMarkRepository } from "../../services/CriteriaMarkRepository";
import { CriteriaRepository } from "../../services/CriteriaRepository";
import { NoticesRepository } from "../../services/NoticesRepository";
import { SchoolsRepository } from "../../services/SchoolsRepository";
import { HttpResponse } from "../../utils/HttpResponse";

export class NoticesController {
  protected noticeRepository: NoticesRepository;
  protected schoolRepository: SchoolsRepository;
  protected criteriaRepository: CriteriaRepository;
  protected criteriaMarkRepository: CriteriaMarkRepository;

  constructor() {
    this.noticeRepository =
      Container.getInstance().resolve<NoticesRepository>(NoticesRepository);

    this.schoolRepository =
      Container.getInstance().resolve<SchoolsRepository>(SchoolsRepository);

    this.criteriaRepository =
      Container.getInstance().resolve<CriteriaRepository>(CriteriaRepository);

    this.criteriaMarkRepository =
      Container.getInstance().resolve<CriteriaMarkRepository>(
        CriteriaMarkRepository
      );
  }

  async create(req: Request, res: Response) {
    // Check school id param
    const schoolId = Number(req.params.schoolid);
    if (isNaN(schoolId)) {
      throw new MissingRequiredParameterError();
    }

    // get and Check school
    const school = await this.schoolRepository.getById(schoolId);
    if (!school) {
      throw new BadRequestError(`No school corresponds to id ${schoolId}`, {
        schoolId,
      });
    }

    // get and Check profile
    const profileId = req.getUserAuth<UserProfile>().profile?.id;
    if (!profileId) {
      throw new ForbiddenError(`the profile is not valid`);
    }

    // checked if the author has already given an opinion
    const authorNotice = await this.noticeRepository.getByMultyId(
      profileId,
      schoolId
    );
    if (authorNotice) {
      throw new BadRequestError(
        "user has already given a review to this school",
        {
          school,
        }
      );
    }

    // Get all criteria
    const criteriaList = await this.criteriaRepository.getAll();

    // Check params
    const { comment, marks } = req.body as NoticeString;
    if (
      !(
        comment &&
        comment.length &&
        marks &&
        marks.length &&
        marks.length === criteriaList.length
      )
    ) {
      throw new MissingRequiredParameterError();
    }

    //
    const criteriaControls = criteriaList.reduce<
      Record<number, boolean | undefined>
    >((acc, value) => {
      acc[value.id] = false;
      return acc;
    }, {});

    //
    const criteriaModels: Array<CriteriaMarkMode> = [];
    for (const mark of marks) {
      if (
        typeof mark.criteria !== "number" ||
        typeof mark.value !== "number" ||
        criteriaControls[mark.criteria] === undefined ||
        criteriaControls[mark.criteria] === true
      ) {
        break;
      } else {
        criteriaControls[mark.criteria] = true;
      }

      criteriaModels.push(
        new CriteriaMarkMode(profileId, schoolId, mark.criteria, mark.value)
      );
    }

    //
    if (criteriaModels.length !== criteriaList.length) {
      throw new BadRequestError(
        "the evaluation criteria are invalid or erroneous"
      );
    }

    //
    const noticeModel = new NoticeModel(comment, profileId, schoolId);
    const notice = await this.noticeRepository.create(noticeModel);

    try {
      //
      const batch = await this.criteriaMarkRepository.createMany(
        criteriaModels
      );

      if (batch.count !== criteriaList.length) {
        this.criteriaMarkRepository
          .deleteMany({
            noticeAuthorId: profileId,
            noticeSchoolId: schoolId,
          })
          .then((_batch) => {
            if (batch.count !== _batch.count) {
              console.error("criteria mark error create and delete many");
            }
          });

        throw new Error("criteria Mark error");
      }
    } catch (error) {
      this.noticeRepository
        .deleteByMultyId(profileId, schoolId)
        .then((notice) => {
          console.log("remove notice:", notice);
        });

      throw new BadRequestError(
        "inappropriate error was encountered while creating your notice"
      );
    }

    return res.json(
      new HttpResponse(undefined, "your notice has been registered")
    );
  }
}
