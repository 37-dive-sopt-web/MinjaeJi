import { useState } from "react";
import * as styles from "@/pages/SignUp/sign-up.css";
import Button from "../Button/Button";
import type { SignUpFormData } from "@/pages/SignUp";

type SignUpIdStepProps = {
  onNext: () => void;
  signUpFormData: Pick<SignUpFormData, "memberId">;
  setSignUpFormData: React.Dispatch<React.SetStateAction<SignUpFormData>>;
};

export default function SignUpIdStep({
  onNext,
  signUpFormData,
  setSignUpFormData,
}: SignUpIdStepProps) {
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSignUpFormData((prev) => ({ ...prev, memberId: value }));

    if (value.length > 50) {
      setErrorMessage("아이디는 50글자를 초과할 수 없습니다.");
    } else {
      setErrorMessage("");
    }
  };

  const isDisabled =
    !signUpFormData.memberId.trim() || signUpFormData.memberId.length > 50;

  return (
    <>
      <label className={styles.label}>
        <span>아이디</span>

        <input
          className={styles.input}
          placeholder="아이디를 입력해 주세요."
          value={signUpFormData.memberId}
          onChange={handleInputChange}
        />
        {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
      </label>

      <Button type="button" onClick={onNext} disabled={isDisabled}>
        다음
      </Button>
    </>
  );
}
