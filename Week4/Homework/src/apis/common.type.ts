// 공통 응답 타입
export interface BaseSuccessResponse {
  success: boolean;
  code: string;
  message: string;
}

export interface SuccessResponse<T> extends BaseSuccessResponse {
  data: T;
}

export interface EmptySuccessResponse extends BaseSuccessResponse {
  data: null;
}

export type ApiResponse<T> = SuccessResponse<T> | EmptySuccessResponse;
