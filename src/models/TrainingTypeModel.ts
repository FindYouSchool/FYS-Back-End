import { TrainingType } from "@prisma/client";

export class TrainingTypeModel implements Omit<TrainingType, "id"> {
  name: string;
  sectors: string[];

  constructor(name: string, sectors: string[]) {
    this.name = name;
    this.sectors = sectors;
  }
}
