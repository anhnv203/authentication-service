import { access } from "fs";

export class MySQLService {

    private readonly mySqlConfig: { [key: string]: any } = null;
  
    constructor() {
      this.mySqlConfig = {
        port: parseInt(process.env.MYSQL_PORT)||3306,
        host:process.env.MYSQL_HOST,
        username:process.env.MYSQL_USERNAME,
        password:process.env.MYSQL_PASSWORD,
        database:process.env.AUTH_DB_NAME
      };
    }
  
    get(key: string): any {
      return this.mySqlConfig[key];
    }
  }
  