import { apiPost } from "../common.api";
import type { PostUserLoginRequest, PostUserLoginResponse } from "./auth.type";

export const postUserLogin = (body: PostUserLoginRequest) => {
  return apiPost<PostUserLoginResponse["data"], PostUserLoginRequest>(
    "/auth/login",
    { body }
  );
};
