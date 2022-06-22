import { Box } from "./Box";
import { Injector } from "./injector";
import { Injectable, Type } from "./types";

export class Container extends Box<Injectable> {
  private static _instance: Container;
  private readonly _injector: Injector;

  private constructor() {
    super();
    this._injector = new Injector(this);
  }

  public get<T>(key: Injectable<T>): T | undefined {
    return super.get(key);
  }

  public register<T = any>(key: Injectable<T>, instance: T): void {
    this.add(key, instance);
  }

  public resolve<T>(target: Type<T>): T {
    return this._injector.resolve<T>(target);
  }

  public static getInstance(): Container {
    if (!Container._instance) {
      Container._instance = new Container();
    }

    return Container._instance;
  }
}

export function getContainerInstance(): Container {
  return Container.getInstance();
}

export default getContainerInstance();
