import Button from "../Button/Button";
import * as styles from "../../pages/SignUp/sign-up.css";

export default function SignUpProfileStep() {
  return (
    <>
      <label className={styles.label}>
        <span>이름</span>
        <input className={styles.input} placeholder="이름을 입력해 주세요." />
      </label>

      <label className={styles.label}>
        <span>이메일</span>
        <input className={styles.input} placeholder="이메일을 입력해 주세요." />
      </label>

      <label className={styles.label}>
        <span>나이</span>
        <input
          className={styles.input}
          type="number"
          placeholder="나이를 입력해 주세요."
        />
      </label>

      <Button type="submit">회원가입</Button>
    </>
  );
}
