import * as styles from "./header.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import hamburgerIcon from "@/assets/hamburger-icon.png";
import closeIcon from "@/assets/x-icon.png";
import { authStorage } from "@/utils/authStorage";
import { deleteUserInfo } from "@/apis/users/users.api";

export default function Header() {
  const [openSideBarMenu, setOpenSideBarMenu] = useState(false);

  const navigate = useNavigate();

  const handleNavClick = (path: string) => {
    navigate(path);
    setOpenSideBarMenu(false);
  };

  const handleLogOutClick = () => {
    if (confirm("정말 로그아웃 하시겠습니까?")) {
      authStorage.clearAuth();
      navigate("/login");
    }
    return;
  };

  const handleWithDrawClick = async () => {
    if (!confirm("정말 탈퇴하시겠습니까?")) return;

    const userId = authStorage.getUserId();
    try {
      if (!userId) {
        throw new Error("사용자 ID를 가져올 수 없습니다.");
      }
      const response = await deleteUserInfo(userId);
      console.log("회원 탈퇴 완료:", response);
      navigate("/login");
    } catch (e) {
      console.error("회원 탈퇴 실패:", e);
      alert("회원 탈퇴에 실패했습니다.");
    }
  };

  return (
    <>
      <header className={styles.headerContainer}>
        <div className={styles.leftTitle}>마이페이지 😋</div>
        {/* TODO: 로그인 성공 후 안녕하세요 지민재 님! 추가 */}

        <nav className={styles.navMenu}>
          <span
            className={`${styles.navItem} ${
              location.pathname === "/my-page" ? styles.activeNavItem : ""
            }`}
            onClick={() => handleNavClick("/my-page")}
          >
            내 정보
          </span>

          <span
            className={`${styles.navItem} ${
              location.pathname === "/members" ? styles.activeNavItem : ""
            }`}
            onClick={() => handleNavClick("/members")}
          >
            회원 조회
          </span>

          <span className={styles.navItem} onClick={handleLogOutClick}>
            로그아웃
          </span>

          <span className={styles.navItem} onClick={handleWithDrawClick}>
            회원 탈퇴
          </span>
        </nav>

        <div
          className={styles.hamburger}
          onClick={() => setOpenSideBarMenu(true)}
        >
          <img src={hamburgerIcon} width={16} height={16} alt="햄버거 아이콘" />
        </div>
      </header>

      {openSideBarMenu && (
        <div
          className={styles.overlay}
          onClick={() => setOpenSideBarMenu(false)}
        />
      )}

      <aside
        className={`${styles.sideMenu} ${
          openSideBarMenu ? styles.sideMenuOpen : ""
        }`}
      >
        <span
          className={styles.closeButton}
          onClick={() => setOpenSideBarMenu(false)}
        >
          <img src={closeIcon} width={16} height={16} />
        </span>

        <span
          className={`${styles.navItem} ${
            location.pathname === "/my-page" ? styles.activeNavItem : ""
          }`}
          onClick={() => handleNavClick("/my-page")}
        >
          내 정보
        </span>

        <span
          className={`${styles.navItem} ${
            location.pathname === "/members" ? styles.activeNavItem : ""
          }`}
          onClick={() => handleNavClick("/members")}
        >
          회원 조회
        </span>

        <span className={styles.navItem} onClick={handleLogOutClick}>
          로그아웃
        </span>

        <span className={styles.navItem} onClick={handleWithDrawClick}>
          회원 탈퇴
        </span>
      </aside>
    </>
  );
}
