import { access } from "fs";

export class ConfigService {

  private readonly envConfig: { [key: string]: any } = null;

  constructor() {
    this.envConfig = {
      host: process.env.AUTH_SERVICE_HOST,
      port: process.env.AUTH_SERVICE_PORT,
      accessSecret: process.env.JWT_ACCESS_TOKEN_SECRET,
      accessExpTime: process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME,
      refreshSecret: process.env.JWT_REFRESH_TOKEN_SECRET,
      refreshExpTime: process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME,
    };
  }

  get(key: string): any {
    return this.envConfig[key];
  }
}
