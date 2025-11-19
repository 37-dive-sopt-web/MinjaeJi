import { useState } from "react";
import * as styles from "@/pages/SignUp/sign-up.css";
import Button from "../Button/Button";
import { isNumeric, isValidEmail } from "@/utils/profileInputValidators";
import type { SignUpFormData } from "@/pages/SignUp";

type SignUpProfileStepProps = {
  onNext: () => void;
  signUpFormData: Pick<SignUpFormData, "name" | "email" | "age">;
  setSignUpFormData: React.Dispatch<React.SetStateAction<SignUpFormData>>;
};

export default function SignUpProfileStep({
  onNext,
  signUpFormData,
  setSignUpFormData,
}: SignUpProfileStepProps) {
  const [errors, setErrors] = useState({
    email: "",
    age: "",
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setSignUpFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "email") {
      if (!value) {
        setErrors((prev) => ({ ...prev, email: "" }));
      } else if (!isValidEmail(value)) {
        setErrors((prev) => ({
          ...prev,
          email: "올바른 이메일 형식이 아닙니다.",
        }));
      } else {
        setErrors((prev) => ({ ...prev, email: "" }));
      }
    }

    if (name === "age") {
      if (!value) {
        setErrors((prev) => ({ ...prev, age: "" }));
      } else if (!isNumeric(value)) {
        setErrors((prev) => ({
          ...prev,
          age: "나이는 숫자만 입력할 수 있어요.",
        }));
      } else {
        setErrors((prev) => ({ ...prev, age: "" }));
      }
    }
  };

  const isDisabled =
    !signUpFormData.name.trim() ||
    !signUpFormData.email.trim() ||
    !signUpFormData.age.trim() ||
    errors.email !== "" ||
    errors.age !== "";

  return (
    <>
      <label className={styles.label}>
        <span>이름</span>
        <input
          className={styles.input}
          name="name"
          placeholder="이름을 입력해 주세요."
          value={signUpFormData.name}
          onChange={onChange}
        />
      </label>

      <label className={styles.label}>
        <span>이메일</span>
        <input
          className={styles.input}
          name="email"
          placeholder="이메일을 입력해 주세요."
          value={signUpFormData.email}
          onChange={onChange}
        />
        {errors.email && <p className={styles.errorMessage}>{errors.email}</p>}
      </label>

      <label className={styles.label}>
        <span>나이</span>
        <input
          className={styles.input}
          name="age"
          placeholder="나이를 입력해 주세요."
          value={signUpFormData.age}
          onChange={onChange}
        />
        {errors.age && <p className={styles.errorMessage}>{errors.age}</p>}
      </label>

      <Button type="button" disabled={isDisabled} onClick={onNext}>
        회원가입
      </Button>
    </>
  );
}
