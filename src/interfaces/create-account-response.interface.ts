export interface ICreateAccountResponse {
  status: number;
  data: {
    email: string;
    phoneNumber: string;
    accountId: number;
    activateCode: string;
    roleId: number;
  };
  message: string;
  errors: { [key: string]: any };
}
