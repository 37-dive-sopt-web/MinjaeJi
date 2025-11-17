import * as styles from "../../pages/SignUp/sign-up.css";
import Button from "../Button/Button";

type SignUpIdStepProps = {
  onNext: () => void;
};

export default function SignUpIdStep({ onNext }: SignUpIdStepProps) {
  return (
    <>
      <label className={styles.label}>
        <span>아이디</span>
        <input className={styles.input} placeholder="아이디를 입력해 주세요." />
      </label>

      <Button type="button" onClick={onNext}>
        다음
      </Button>
    </>
  );
}
