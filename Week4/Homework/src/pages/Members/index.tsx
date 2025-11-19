import { useState } from "react";
import * as styles from "./member.css";
import Button from "@/components/Button/Button";
import { getUserInfo } from "@/apis/users/users.api";
import type { User } from "@/apis/users/users.type";

export default function Members() {
  const [searchId, setSearchId] = useState("");
  const [member, setMember] = useState<User | null>(null);
  const [searched, setSearched] = useState(false);

  const handleSearchBtnClick = async () => {
    try {
      const userInfoResponse = await getUserInfo(parseInt(searchId));
      console.log("사용자 정보 조회 성공", userInfoResponse);

      if (!userInfoResponse.data) {
        setMember(null);
        setSearched(true);
        return;
      }
      setMember(userInfoResponse.data);
      setSearched(true);
    } catch (e) {
      console.error("사용자 조회 실패", e);
      setMember(null);
      setSearched(true);
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

        {searched && !member && (
          <div className={styles.resultBox}>
            <p>조회된 멤버가 없습니다.</p>
          </div>
        )}

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
