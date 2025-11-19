import type { User } from "@/apis/users/users.type";

const AUTH_KEYS = {
  USER_INFO: "auth_user_info",
  USER_ID: "auth_user_id",
} as const;

export const authStorage = {
  // 로그인 후 사용자 정보 저장
  saveUserInfo: (user: User) => {
    localStorage.setItem(AUTH_KEYS.USER_INFO, JSON.stringify(user));
  },

  // 저장된 사용자 정보 가져오기
  getUserInfo: (): User | null => {
    const json = localStorage.getItem(AUTH_KEYS.USER_INFO);
    return json ? JSON.parse(json) : null;
  },

  // userId만 저장
  saveUserId: (userId: number) => {
    localStorage.setItem(AUTH_KEYS.USER_ID, String(userId));
  },

  // userId 가져오기
  getUserId: (): number | null => {
    const id = localStorage.getItem(AUTH_KEYS.USER_ID);
    return id ? parseInt(id) : null;
  },

  // 로그아웃 시 로컬 스토리지 제거
  clearAuth: () => {
    localStorage.removeItem(AUTH_KEYS.USER_INFO);
    localStorage.removeItem(AUTH_KEYS.USER_ID);
  },
};
