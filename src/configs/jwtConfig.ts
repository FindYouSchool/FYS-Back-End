export const jwtConfig = {
  accessToken: {
    algorithm: String(process.env.ACCESS_TOKEN_ALGORITHM),
    secret: String(process.env.ACCESS_TOKEN_SECRET),
    expiresIn: String(process.env.ACCESS_TOKEN_EXPIRES_IN),
  },
  refreshToken: {
    algorithm: String(process.env.REFRESH_TOKEN_ALGORITHM),
    secret: String(process.env.REFRESH_TOKEN_SECRET),
    expiresIn: String(process.env.REFRESH_TOKEN_EXPIRES_IN),
    rememberExpiresIn: String(process.env.REFRESH_TOKEN_REMEMBER_EXPIRES_IN),
  },
};
