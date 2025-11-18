import * as styles from "./my-page.css";
import { useState } from "react";
import Button from "@/components/Button/Button";
import Modal from "@/components/Modal/Modal";

export default function MyPage() {
  const [form, setForm] = useState({
    id: "test_id_123",
    name: "",
    email: "",
    age: "",
  });

  const [modalOpen, setModalOpen] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditUserInfo = () => {
    console.log("저장 됨:", form);
    setModalOpen(true);
  };

  return (
    <>
      <div className={styles.container}>
        <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
          <h1 className={styles.title}>내 정보</h1>

          <div className={styles.step}>
            <label className={styles.label}>
              <span>아이디</span>
              <input
                className={styles.input}
                name="id"
                value={form.id}
                readOnly
              />
            </label>

            <label className={styles.label}>
              <span>이름</span>
              <input
                className={styles.input}
                name="name"
                value={form.name}
                onChange={onChange}
              />
            </label>

            <label className={styles.label}>
              <span>이메일</span>
              <input
                className={styles.input}
                name="email"
                value={form.email}
                onChange={onChange}
              />
            </label>

            <label className={styles.label}>
              <span>나이</span>
              <input
                className={styles.input}
                type="number"
                name="age"
                value={form.age}
                onChange={onChange}
              />
            </label>
          </div>

          <Button type="button" onClick={handleEditUserInfo}>
            저장
          </Button>
        </form>
      </div>

      <Modal
        type="alert"
        message="수정이 완료되었습니다."
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}
