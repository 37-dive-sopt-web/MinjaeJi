import * as styles from "@/pages/SignUp/sign-up.css.ts";
import { useState } from "react";
import iconEyeClosed from "@/assets/eye-closed-icon.png";
import iconEyeOpen from "@/assets/eye-open-icon.png";
import Button from "../Button/Button.tsx";
import { getPasswordErrors } from "@/utils/getPasswordErrors.ts";
import type { SignUpFormData } from "@/pages/SignUp/index.tsx";

type SignUpPasswordStepProps = {
  onNext: () => void;
  signUpFormData: Pick<SignUpFormData, "password" | "confirmPassword">;
  setSignUpFormData: React.Dispatch<React.SetStateAction<SignUpFormData>>;
};

export default function SignUpPasswordStep({
  onNext,
  signUpFormData,
  setSignUpFormData,
}: SignUpPasswordStepProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const passwordErrors = getPasswordErrors(signUpFormData.password);
  const firstError = passwordErrors[0];
  const isPasswordValid = passwordErrors.length === 0;
  const isMatch = signUpFormData.password === signUpFormData.confirmPassword;

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignUpFormData((prev) => ({ ...prev, password: e.target.value }));
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSignUpFormData((prev) => ({ ...prev, confirmPassword: e.target.value }));
  };

  return (
    <>
      <label className={styles.label}>
        <span>비밀번호</span>
        <div className={styles.passwordWrapper}>
          <input
            className={styles.input}
            type={showPassword ? "text" : "password"}
            placeholder="비밀번호를 입력해 주세요."
            value={signUpFormData.password}
            onChange={handlePasswordChange}
            autoComplete="new-password"
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
              alt="비밀번호 표시"
            />
          </button>
        </div>

        {firstError && <p className={styles.errorMessage}>{firstError}</p>}
      </label>

      <label className={styles.label}>
        <span>비밀번호 확인</span>
        <div className={styles.passwordWrapper}>
          <input
            className={styles.input}
            type={showConfirmPassword ? "text" : "password"}
            placeholder="비밀번호를 다시 입력해 주세요."
            value={signUpFormData.confirmPassword}
            onChange={handleConfirmPasswordChange}
            autoComplete="new-password"
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
              alt="비밀번호 확인 표시"
            />
          </button>
        </div>

        {signUpFormData.password &&
          signUpFormData.confirmPassword &&
          !isMatch && (
            <p className={styles.errorMessage}>비밀번호가 일치하지 않습니다.</p>
          )}
      </label>

      <Button
        type="button"
        onClick={onNext}
        disabled={!isMatch || !isPasswordValid}
      >
        다음
      </Button>
    </>
  );
}
