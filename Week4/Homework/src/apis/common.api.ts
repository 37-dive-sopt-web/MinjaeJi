import { axiosInstance } from "./axiosInstance";
import type { ApiResponse } from "./common.type";

interface RequestOptions<B = unknown> {
  query?: Record<string, string | number>;
  body?: B; // 없을 수도 있음을 unknown으로 표현
}

export async function apiGet<T>(
  url: string,
  options?: RequestOptions
): Promise<ApiResponse<T>> {
  const params = options?.query;
  const response = await axiosInstance.get<ApiResponse<T>>(url, { params });
  return response.data;
}

export async function apiPost<T, B = unknown>(
  url: string,
  options?: RequestOptions<B>
): Promise<ApiResponse<T>> {
  const response = await axiosInstance.post<ApiResponse<T>>(url, options?.body);
  return response.data;
}

export async function apiPatch<T, B = unknown>(
  url: string,
  options?: RequestOptions<B>
): Promise<ApiResponse<T>> {
  const response = await axiosInstance.patch<ApiResponse<T>>(
    url,
    options?.body
  );
  return response.data;
}

export async function apiDelete<T>(
  url: string,
  options?: RequestOptions
): Promise<ApiResponse<T>> {
  const params = options?.query;
  const response = await axiosInstance.delete<ApiResponse<T>>(url, { params });
  return response.data;
}
