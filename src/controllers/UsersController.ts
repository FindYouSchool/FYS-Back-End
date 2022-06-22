import { Request, Response } from "express";
import { UsersRepository } from "../services/UsersRepository";
import { UserModel } from "../models/UserModel";

export class UsersController {
  protected repository: UsersRepository;

  constructor() {
    this.repository = new UsersRepository();
  }

  async create(req: Request, res: Response) {
    const user = new UserModel("yves", "kamwa@gmail.com", "113");
    const result = await this.repository.create(user);
    res.json(result);
  }

  async getAll(req: Request, res: Response) {
    const results = await this.repository.getAll();
    res.json(results);
  }
}

export default new UsersController();
