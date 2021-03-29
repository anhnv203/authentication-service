import { Controller, Get } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { response } from 'express';
import { AppService } from './app.service';
import { IServiceResponse } from './interfaces/service-response.interface';

@Controller()
export class AppController {
  constructor(
    private readonly service: AppService
  ) { }

  @MessagePattern('login')
  public async login(data: any): Promise<IServiceResponse> {
    const result: IServiceResponse = await this.service.userLogin(data);
    return result;
  }

  @MessagePattern('register-account')
  public async register(data: any): Promise<IServiceResponse> {
    const result: IServiceResponse = await this.service.registerAccount(data);
    return result;
  }

  @MessagePattern('get-profile')
  public async getProfile(data: any): Promise<IServiceResponse> {
    const result = await this.service.getProfile(data);
    return result;
  }
  @MessagePattern('renew-access-token')
  public async renewAccesToken(data: any): Promise<IServiceResponse> {
    const result = await this.service.renewAccessToken(data);
    return result;
  }
}
