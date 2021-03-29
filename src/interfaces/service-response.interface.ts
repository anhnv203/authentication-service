export interface IServiceResponse {
    status: number;
    data: { [key: string]: any };
    message: string;
    errors: { [key: string]: any };
  }
  