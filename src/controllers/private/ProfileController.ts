import { Gender } from "@prisma/client";
import { Request, Response } from "express";
import { UserProfile } from "../../common/UserProfile";
import {
  MissingRequiredParameterError,
  BadRequestError,
  ForbiddenError,
} from "../../errors";
import IProfileString from "../../interface/IProfileString";
import { Container } from "../../lib/di";
import { ProfileModel } from "../../models/ProfileModel";
import { ProfileRepository } from "../../services/ProfileRepository";
import { RoleRepository } from "../../services/RoleRepository";
import { HttpResponse } from "../../utils/HttpResponse";

export class ProfileController {
  protected profileRepository: ProfileRepository;
  protected roleRepository: RoleRepository;

  constructor() {
    this.profileRepository =
      Container.getInstance().resolve<ProfileRepository>(ProfileRepository);

    this.roleRepository =
      Container.getInstance().resolve<RoleRepository>(RoleRepository);
  }

  async get(req: Request, res: Response) {
    //
    const user = req.getUserAuth<UserProfile>();

    res.json(
      new HttpResponse({
        ...user,
      })
    );
  }

  async create(req: Request, res: Response) {
    //
    const profileId = req.getUserAuth<UserProfile>().profile?.id;
    if (profileId) {
      throw new ForbiddenError("the profile has already been created");
    }

    //
    const {
      firstName,
      lastName,
      gender,
      role: roleName,
      avatar,
    } = req.body as IProfileString;

    if (!(firstName && lastName && gender && roleName)) {
      throw new MissingRequiredParameterError();
    }

    //
    const _gender: Gender | undefined = Gender[gender.toUpperCase() as Gender];
    if (!_gender) {
      throw new BadRequestError("gender is not a valid type", {
        gender,
      });
    }

    //
    const role = await this.roleRepository.getByName(roleName);
    if (!role) {
      throw new BadRequestError("the role is invalid or cannot be found");
    }

    const userId = req.getUserAuth<UserProfile>().id;

    const profileData = new ProfileModel(
      firstName,
      lastName,
      _gender,
      role.id,
      userId,
      avatar
    );

    const profile = await this.profileRepository.create(profileData);

    res.json(
      new HttpResponse({
        profile,
      })
    );
  }
}
