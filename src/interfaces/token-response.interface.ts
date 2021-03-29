export interface ITokenResponse {
  status: number;
  accessToken: string|null;
  refreshToken: string|null;
  message: string;
}
