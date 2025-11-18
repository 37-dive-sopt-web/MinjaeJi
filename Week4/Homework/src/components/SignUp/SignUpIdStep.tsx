import { useState } from "react";
import * as styles from "@/pages/SignUp/sign-up.css";
import Button from "../Button/Button";
import type { SignUpFormData } from "@/pages/SignUp";

type SignUpIdStepProps = {
  onNext: () => void;
  formData: Pick<SignUpFormData, "memberId">;
  setFormData: React.Dispatch<React.SetStateAction<SignUpFormData>>;
};

export default function SignUpIdStep({
  onNext,
  formData,
  setFormData,
}: SignUpIdStepProps) {
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, memberId: value }));

    if (value.length > 50) {
      setErrorMessage("아이디는 50글자를 초과할 수 없습니다.");
    } else {
      setErrorMessage("");
    }
  };

  const isDisabled = !formData.memberId.trim() || formData.memberId.length > 50;

  return (
    <>
      <label className={styles.label}>
        <span>아이디</span>

        <input
          className={styles.input}
          placeholder="아이디를 입력해 주세요."
          value={formData.memberId}
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
