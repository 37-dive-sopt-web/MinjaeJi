import { useState } from "react";
import * as styles from "../../pages/SignUp/sign-up.css.ts";
import iconEyeClosed from "../../assets/icon-eye-closed.png";
import iconEyeOpen from "../../assets/icon-eye-open.png";
import Button from "../Button/Button.tsx";

type SignUpPasswordStepProps = {
  onNext: () => void;
};

export default function SignUpPasswordStep({
  onNext,
}: SignUpPasswordStepProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const isMatch = password === confirmPassword;

  return (
    <>
      <label className={styles.label}>
        <span>비밀번호</span>
        <div className={styles.passwordWrapper}>
          <input
            className={styles.input}
            type={showPassword ? "text" : "password"}
            placeholder="비밀번호를 입력해 주세요."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            className={styles.toggleButton}
            onClick={() => setShowPassword((prev) => !prev)}
          >
            <img
              src={showPassword ? iconEyeClosed : iconEyeOpen}
              width={20}
              height={20}
            />
          </button>
        </div>
      </label>
      <label className={styles.label}>
        <span>비밀번호 확인</span>
        <div className={styles.passwordWrapper}>
          <input
            className={styles.input}
            type={showConfirmPassword ? "text" : "password"}
            placeholder="비밀번호를 다시 입력해 주세요."
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button
            type="button"
            className={styles.toggleButton}
            onClick={() => setShowConfirmPassword((prev) => !prev)}
          >
            <img
              src={showConfirmPassword ? iconEyeClosed : iconEyeOpen}
              width={20}
              height={20}
            />
          </button>
        </div>
      </label>
      <Button type="button" onClick={onNext} disabled={!isMatch || !password}>
        다음
      </Button>
    </>
  );
}
