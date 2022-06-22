export interface Type<T = any> {
  new (...args: any[]): T;
}

export interface Injection {
  index: number;
  injectable: Injectable;
}

export class InjectionToken {
  constructor(public token: string) {}

  public toString(): string {
    return this.token;
  }
}

export type Injectable<T = any> = Type<T> | string | InjectionToken;
