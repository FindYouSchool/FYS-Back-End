import { Box } from "./Box";
import { Injectable, Type } from "./types";

export class Injector {
  private readonly _store: Box<Injectable>;

  constructor(store: Box<Injectable>) {
    if (store) this._store = store;
    else this._store = new Box();
  }

  public resolve<T>(target: Type): T {
    const classInstance = this.getClassInstance<T>(target);
    if (classInstance) {
      return classInstance;
    }

    return this.buildInstance<T>(target); //Todo: add class deps
  }

  public buildInstance<T>(target: Type, deps = []): T {
    const newClassInstance = new target(deps); //Todo: include deps
    this._store.set(target, newClassInstance);

    console.debug(
      `Di-Container created class ${newClassInstance.constructor.name}`
    );

    return newClassInstance;
  }

  public getClassInstance<T>(target: Type): T | undefined {
    const instance = this._store.get<T>(target);
    if (typeof instance === "object" && instance instanceof target)
      return instance;
    return undefined;
  }
}
