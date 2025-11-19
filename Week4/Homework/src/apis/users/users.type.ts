import type { ApiResponse } from "../common.type";

// 회원 가입
export interface PostUserSignUpRequest {
  username: string;
  password: string;
  name: string;
  email: string;
  age: number;
}

export interface User {
  id: number;
  username: string;
  name: string;
  email: string;
  age: number;
  status: string;
}

export type PostUserSignUpResponse = ApiResponse<User>;

// 회원 정보 조회
export type GetUserInfoResponse = ApiResponse<User>;

// 회원 탈퇴
export type DeleteUserInfoResponse = ApiResponse<null>;

// 회원 정보 수정
export type PatchUserInfoRequest = Partial<PostUserSignUpRequest>;

export type PatchUserUserInfoResponse = ApiResponse<User>;
