import type { User } from "@/apis/users/users.type";

const STORAGE_KEYS = {
  USER: "user",
  USER_ID: "userId",
} as const;

export const storage = {
  // 사용자 정보 저장
  setUser: (user: User) => {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  },

  // 사용자 정보 가져오기
  getUser: (): User | null => {
    const user = localStorage.getItem(STORAGE_KEYS.USER);
    return user ? JSON.parse(user) : null;
  },

  // userId만 저장
  setUserId: (userId: number) => {
    localStorage.setItem(STORAGE_KEYS.USER_ID, userId.toString());
  },

  // userId 가져오기
  getUserId: (): number | null => {
    const userId = localStorage.getItem(STORAGE_KEYS.USER_ID);
    return userId ? parseInt(userId) : null;
  },

  // 로그아웃 시 정보 삭제
  clearUser: () => {
    localStorage.removeItem(STORAGE_KEYS.USER);
    localStorage.removeItem(STORAGE_KEYS.USER_ID);
  },
};
