import type { ApiResponse } from "../common.type";

export interface PostUserLoginRequest {
  username: string;
  password: string;
}
export interface LoginSuccessResult {
  userId: number;
  message: string;
}

export type PostUserLoginResponse = ApiResponse<LoginSuccessResult>;
