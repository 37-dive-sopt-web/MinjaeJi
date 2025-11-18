import { useState } from "react";
import * as styles from "./member.css";
import Button from "@/components/Button/Button";

type MemberInfo = {
  id: string;
  name: string;
  email: string;
  age: number;
};

export default function Members() {
  const [searchId, setSearchId] = useState("");
  const [member, setMember] = useState<MemberInfo | null>(null);

  const handleSearchBtnClick = () => {
    // 테스트용 mock 데이터
    if (searchId === "test") {
      setMember({
        id: "test",
        name: "홍길동",
        email: "test@example.com",
        age: 25,
      });
    } else {
      setMember(null);
      alert("해당 회원을 찾을 수 없습니다.");
    }
  };

  return (
    <main className={styles.container}>
      <div className={styles.form}>
        <h1 className={styles.title}>회원 조회</h1>

        <label className={styles.label}>
          <span>회원 ID</span>
          <input
            name="id"
            className={styles.input}
            placeholder="아이디를 입력하세요."
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
          />
        </label>

        <Button type="button" onClick={handleSearchBtnClick}>
          검색
        </Button>

        {member && (
          <div className={styles.resultBox}>
            <div className={styles.resultRow}>
              <span className={styles.resultLabel}>이름</span>
              <span className={styles.resultValue}>{member.name}</span>
            </div>

            <div className={styles.resultRow}>
              <span className={styles.resultLabel}>아이디</span>
              <span className={styles.resultValue}>{member.id}</span>
            </div>

            <div className={styles.resultRow}>
              <span className={styles.resultLabel}>이메일</span>
              <span className={styles.resultValue}>{member.email}</span>
            </div>

            <div className={styles.resultRow}>
              <span className={styles.resultLabel}>나이</span>
              <span className={styles.resultValue}>{member.age}</span>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
