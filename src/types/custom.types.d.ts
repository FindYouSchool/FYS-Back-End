declare interface UserAuth {
  disabled: boolean;
  verified: boolean;
}

declare namespace Express {
  interface Request {
    /**
     * Return user authentificated from request
     */
    getUserAuth(): UserAuth;
    getUserAuth<T extends UserAuth>(): T;
    getUserAuth<T extends object>(): T;
  }
}
