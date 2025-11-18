import * as styles from "./login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import iconEyeClosed from "@/assets/eye-closed-icon.png";
import iconEyeOpen from "@/assets/eye-open-icon.png";
import Button from "@/components/Button/Button";
import type { PostUserLoginRequest } from "@/apis/auth/auth.type";
import { postUserLogin } from "@/apis/auth/auth.api";
import { storage } from "@/utils/storage";
import { getUserInfo } from "@/apis/users/users.api";

export default function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginForm((prev) => ({ ...prev, [name]: value }));
  };

  const isDisabled = !(loginForm.username.trim() && loginForm.password.trim());

  const handleUserLogin = async () => {
    if (isDisabled || loading) return;

    setLoading(true);
    try {
      const body: PostUserLoginRequest = {
        username: loginForm.username,
        password: loginForm.password,
      };

      const loginResponse = await postUserLogin(body);

      const userId = loginResponse.data?.userId;
      if (!userId) {
        throw new Error("사용자 ID를 가져올 수 없습니다.");
      }

      storage.setUserId(userId);

      const userInfoResponse = await getUserInfo(userId);
      console.log("사용자 정보 조회 성공", userInfoResponse);

      // 사용자 정보가 없으면 에러 처리
      if (!userInfoResponse.data) {
        alert("사용자 정보를 가져올 수 없습니다.");
        return;
      }

      // 사용자 정보 저장
      storage.setUser(userInfoResponse.data);

      navigate("/my-page");
    } catch (e) {
      console.error("로그인 실패", e);
      alert("아이디 또는 비밀번호가 올바르지 않습니다."); // TODO: 모달로 변경
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.container}>
      <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
        <h1 className={styles.title}>로그인</h1>

        <label className={styles.label}>
          <span>아이디</span>
          <input
            className={styles.input}
            name="username"
            value={loginForm.username}
            onChange={onChange}
            placeholder="아이디를 입력해 주세요."
          />
        </label>

        <label className={styles.label}>
          <span>비밀번호</span>
          <div className={styles.passwordWrapper}>
            <input
              className={styles.input}
              name="password"
              value={loginForm.password}
              onChange={onChange}
              type={showPassword ? "text" : "password"}
              placeholder="비밀번호를 입력해 주세요."
              autoComplete="current-password"
            />
            <button
              type="button"
              className={styles.toggleButton}
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? (
                <img
                  src={iconEyeClosed}
                  width={20}
                  height={20}
                  alt="비밀번호 숨김 아이콘"
                />
              ) : (
                <img
                  src={iconEyeOpen}
                  width={20}
                  height={20}
                  alt="비밀번호 노출 아이콘"
                />
              )}
            </button>
          </div>
        </label>

        <div className={styles.buttonGroup}>
          <Button
            type="submit"
            disabled={isDisabled || loading}
            onClick={handleUserLogin}
          >
            {loading ? "로그인 중..." : "로그인"}
          </Button>

          <button
            type="button"
            className={styles.signupButton}
            onClick={() => navigate("/sign-up")}
          >
            회원가입
          </button>
        </div>
      </form>
    </main>
  );
}
