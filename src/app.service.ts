import { Injectable, HttpStatus } from '@nestjs/common';
import { getConnection, getRepository } from 'typeorm';
import { Account } from './entities/account.entity';
import { IServiceResponse } from './interfaces/service-response.interface';
import * as bcrypt from 'bcryptjs';
import { AccountDetail } from './entities/account-detail.entity';
import { ACCOUNTTYPE, MESSAGES } from './common/constant';
import { AccountToken } from './entities/account-token.entity';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from './config/config.service';

@Injectable()
export class AppService {
  constructor(
    private readonly jwtService: JwtService,
  ) { }
  private async getEncryptedPassword(password: string) {
    const saltPW = await bcrypt.genSalt(10);
    const hashPW = await bcrypt.hash(String(password), saltPW);
    return { hashPW, saltPW };
  }
  private async comparePassword(hashPW, password) {
    return await bcrypt.compare(password, hashPW);
  }
  public async userLogin(data) {
    const response: IServiceResponse = {
      status: null,
      data: null,
      message: null,
      errors: null,
    };
    const existedAccount = await getRepository(Account).findOne({
      where: [
        { email: data.username },
        { phoneNumber: data.username, },
      ],
    });
    if (!existedAccount) {
      response.status = HttpStatus.NOT_FOUND;
      response.message = MESSAGES.DATA_NOT_FOUND;
      return response;
    }
    const isValidPassword = await this.comparePassword(
      existedAccount.passwordHash,
      data.password,
    );
    if (!isValidPassword) {
      response.status = HttpStatus.BAD_REQUEST;
      response.message = MESSAGES.INVALID_PASSWORD;
      return response;
    }
    const createdToken = await this.createToken({ accountId: existedAccount.id });
    response.status = HttpStatus.OK;
    response.data = {
      accessToken: createdToken.accessToken,
      refreshToken: createdToken.refreshToken,
      loginAt: createdToken.createdAt
    };
    response.message = MESSAGES.LOGIN_SUCCESS;
    return response;
  }

  public async registerAccount(data) {
    const response: IServiceResponse = {
      status: HttpStatus.OK,
      data: null,
      errors: null,
      message: null,
    }
    const connection = getConnection();
    const existedAccount = await connection.getRepository(Account).findOne({ email: data.email })
    if (existedAccount) {
      response.status = HttpStatus.BAD_REQUEST;
      response.message = 'ACCOUNT_EXISTED';
      return response;
    }
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    const currentTime = new Date();
    const { hashPW, saltPW } = await this.getEncryptedPassword(data.password);
    try {
      const accountDTO = new Account();
      accountDTO.email = data.email;
      accountDTO.phoneNumber = data.phoneNumber;
      accountDTO.passwordHash = hashPW;
      accountDTO.passwordSalt = saltPW;
      accountDTO.createdAt = currentTime;
      const createdAccount = await queryRunner.manager.save(accountDTO);
      const accountDetailDTO = new AccountDetail();
      accountDetailDTO.accountId = createdAccount.id;
      accountDetailDTO.firstName = data.firstName;
      accountDetailDTO.lastName = data.lastName;
      accountDetailDTO.identityNumber = data.identityNumber;
      accountDetailDTO.birthday = data.birthday;
      accountDetailDTO.gender = data.gender;
      accountDetailDTO.roleId = data.roleId || 1;
      accountDetailDTO.accountType = data.accountType || ACCOUNTTYPE.USER;
      const createdAccountDetail = await queryRunner.manager.save(
        accountDetailDTO,
      );
      response.status = HttpStatus.CREATED;
      response.data = {
        accountId: createdAccount.id,
        email: createdAccount.email,
        phoneNumber: createdAccount.phoneNumber,
      };
      response.message = MESSAGES.ACCOUNT_CREATE_SUCCESS;
      response.errors = null;
      await queryRunner.commitTransaction();
    } catch (err) {
      response.status = HttpStatus.BAD_REQUEST;
      response.message = MESSAGES.ACCOUNT_CREATE_FAIL;
      response.errors = err;
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
    return response;
  }
  public async createToken(data: any): Promise<AccountToken> {
    const { accountId } = data
    const accessToken = this.jwtService.sign(
      {
        accountId,
      },
      {
        secret: new ConfigService().get('accessSecret'),
        expiresIn: new ConfigService().get('accessExpTime'),
      },
    );
    const refreshToken = this.jwtService.sign(
      {
        accountId,
      },
      {
        secret: new ConfigService().get('refreshSecret'),
        expiresIn: new ConfigService().get('refreshExpTime'),
      },
    );
    const tokenDTO = {
      accountId: accountId,
      accessToken: accessToken,
      refreshToken: refreshToken,
      createdAt: new Date(),
    };
    const createdToken = await getRepository(AccountToken).save(tokenDTO);
    return createdToken;
  }
  public async getProfile(data: any) {
    const response: IServiceResponse = {
      status: HttpStatus.OK,
      data: null,
      message: null,
      errors: null,
    };
    const existedAccount = await getRepository(Account).findOne({
      id: data.accountId,
    });
    if (!existedAccount) {
      response.status = HttpStatus.NOT_FOUND;
      response.message = MESSAGES.DATA_NOT_FOUND;
      return response;
    }
    const existedAccountDetail = await getRepository(AccountDetail).findOne({
      accountId: existedAccount?.id,
    });
    response.data = {
      accountId: existedAccount.id,
      email: existedAccount.email,
      phoneNumber: existedAccount.phoneNumber,
      firstName: existedAccountDetail.firstName,
      lastName: existedAccountDetail.lastName,
      gender: Boolean(existedAccountDetail.gender)
    }
    return response;
  }
  public renewAccessToken(accountId: string) {
    const response: IServiceResponse = {
      status: HttpStatus.CREATED,
      data: null,
      message: null,
      errors: null,
    };
    const accessToken = this.jwtService.sign(
      {
        accountId,
      },
      {
        secret: new ConfigService().get('accessSecret'),
        expiresIn: new ConfigService().get('accessExpTime'),
      },
    );
    response.data = {
      accessToken
    }
    return response;
  }
}
