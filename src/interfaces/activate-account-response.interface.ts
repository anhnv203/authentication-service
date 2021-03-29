export interface IActivateAccountResponse {
  status: number;
  data: {
    accountId?: number;
    accessToken: string;
    refreshToken: string;
  };
  message: string;
  errors: { [key: string]: any };
}
