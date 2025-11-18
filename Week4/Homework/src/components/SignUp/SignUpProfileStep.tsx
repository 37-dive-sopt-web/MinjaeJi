import { useState } from "react";
import * as styles from "@/pages/SignUp/sign-up.css";
import Button from "../Button/Button";
import { isNumeric, isValidEmail } from "@/utils/profileInputValidators";

type SignUpProfileStepProps = {
  onNext?: () => void;
};

export default function SignUpProfileStep({ onNext }: SignUpProfileStepProps) {
  const [signUpForm, setSignUpForm] = useState({
    name: "",
    email: "",
    age: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    age: "",
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setSignUpForm((prev) => ({ ...prev, [name]: value }));

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
    !signUpForm.name.trim() ||
    !signUpForm.email.trim() ||
    !signUpForm.age.trim() ||
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
          value={signUpForm.name}
          onChange={onChange}
        />
      </label>

      <label className={styles.label}>
        <span>이메일</span>
        <input
          className={styles.input}
          name="email"
          placeholder="이메일을 입력해 주세요."
          value={signUpForm.email}
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
          value={signUpForm.age}
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
