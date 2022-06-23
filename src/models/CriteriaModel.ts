import { Criteria } from "@prisma/client";

export class CriteriaModel implements Omit<Criteria, "id"> {
  name: string;
  description: string;

  constructor(name: string, description: string) {
    this.name = name;
    this.description = description;
  }
}
