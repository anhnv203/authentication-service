import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { JwtModule } from '@nestjs/jwt';
import { Account } from './entities/account.entity';
import { Role } from './entities/role.entity';
import { AccountDetail } from './entities/account-detail.entity';
import { AccountToken } from './entities/account-token.entity';
import { JwtConfigService } from './config/jwt-config.service';
import { AppService } from './app.service';


@Module({
  imports: [
    JwtModule.registerAsync({
      useClass: JwtConfigService,
    }),
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forFeature([
      Account,
      AccountDetail,
      Role,
      AccountToken,
    ]),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      port: parseInt(process.env.MYSQL_PORT, 10) || 3306,
      username: process.env.MYSQL_USERNAME,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.AUTH_DB_NAME,
      entities: ['dist/**/**.entity{.ts,.js}'],
      synchronize: false,
      timezone: process.env.TIME_ZONE,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
