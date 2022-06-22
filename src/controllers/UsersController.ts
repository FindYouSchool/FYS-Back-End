import { Request, Response } from "express";
import { UsersRepository } from "../services/UsersRepository";
import { UserModel } from "../models/UserModel";
import { BadRequestError, MissingRequiredParameterError } from "../errors";
import IUserString from "../interface/IUserString";
import passcrypt from "../utils/passcrypt";
import { HttpResponse } from "../utils/HttpResponse";
import { Container } from "../lib/di";

export class UsersController {
  protected repository: UsersRepository;

  constructor() {
    this.repository =
      Container.getInstance().resolve<UsersRepository>(UsersRepository);
  }

  async create(req: Request, res: Response) {
    const { email, password, username } = req.body as IUserString;

    if (!(email && password && username)) {
      throw new MissingRequiredParameterError();
    }

    const user = await this.repository.get(email);

    if (user) {
      throw new BadRequestError("user alrady exist");
    }

    const hashedPassword = await passcrypt.hashPassword(password);
    const newUser = new UserModel(username, email, hashedPassword);
    const result = await this.repository.create(newUser);

    res.status(200).json(new HttpResponse(result, "user create !"));
  }

  async getAll(req: Request, res: Response) {
    const results = await this.repository.getAll();
    res.json(results);
  }
}

export default new UsersController();
