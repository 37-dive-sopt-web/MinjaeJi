import * as styles from "./my-page.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@/components/Button/Button";
import { authStorage } from "@/utils/authStorage";
import type { PatchUserInfoRequest } from "@/apis/users/users.type";
import { patchUserInfo } from "@/apis/users/users.api";

export default function MyPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    username: "",
    name: "",
    email: "",
    age: "",
  });

  useEffect(() => {
    const user = authStorage.getUserInfo();

    if (!user) {
      alert("로그인이 필요합니다.");
      navigate("/login");
      return;
    }

    setForm({
      username: user.username,
      name: user.name,
      email: user.email,
      age: user.age.toString(),
    });
  }, [navigate]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditUserInfo = async () => {
    if (loading) return;

    const userId = authStorage.getUserId();

    if (!userId) {
      alert("사용자 정보를 찾을 수 없습니다.");
      navigate("/login");
      return;
    }

    setLoading(true);
    try {
      const body: PatchUserInfoRequest = {
        name: form.name,
        email: form.email,
        age: parseInt(form.age),
      };

      const response = await patchUserInfo(userId, body);
      console.log("수정 성공:", response);

      if (response.data) {
        authStorage.saveUserInfo(response.data);
        alert("정보가 수정되었습니다!");
      }
    } catch (e) {
      console.error("수정 실패:", e);
      alert("정보 수정에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
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
                name="username"
                value={form.username}
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
                disabled={loading}
              />
            </label>

            <label className={styles.label}>
              <span>이메일</span>
              <input
                className={styles.input}
                name="email"
                value={form.email}
                onChange={onChange}
                disabled={loading}
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
                disabled={loading}
              />
            </label>
          </div>

          <Button type="button" onClick={handleEditUserInfo} disabled={loading}>
            {loading ? "저장 중..." : "저장"}
          </Button>
        </form>
      </div>
    </>
  );
}
