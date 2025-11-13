import { apiPost, apiGet, apiDelete, apiPatch } from "../common.api";
import type {
  PostUserSignUpRequest,
  PostUserSignUpResponse,
  GetUserInfoResponse,
  DeleteUserInfoResponse,
  PatchUserInfoRequest,
  PatchUserUserInfoResponse,
} from "./users.type";

// 회원 가입
export const postUserSignUp = (body: PostUserSignUpRequest) => {
  return apiPost<PostUserSignUpResponse["data"], PostUserSignUpRequest>(
    "/users/signup",
    { body }
  );
};

// 회원 정보 조회
export const getUserInfo = (userId: number) => {
  return apiGet<GetUserInfoResponse["data"]>(`/users/${userId}`);
};

// 회원 탈퇴
export const deleteUserInfo = (userId: number) => {
  return apiDelete<DeleteUserInfoResponse["data"]>(`/users/${userId}`);
};

// 회원 정보 수정
export const patchUserInfo = (userId: number, body: PatchUserInfoRequest) => {
  return apiPatch<PatchUserUserInfoResponse["data"], PatchUserInfoRequest>(
    `/users/${userId}`,
    { body }
  );
};
