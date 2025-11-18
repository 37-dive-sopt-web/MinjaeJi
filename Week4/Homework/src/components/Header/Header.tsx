import * as styles from "./header.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import hamburgerIcon from "@/assets/hamburger-icon.png";
import closeIcon from "@/assets/x-icon.png";

export default function Header() {
  const [openSideBarMenu, setOpenSideBarMenu] = useState(false);

  const navigate = useNavigate();

  const handleNavClick = (path: string) => {
    navigate(path);
    setOpenSideBarMenu(false);
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

          <span className={styles.navItem}>로그아웃</span>

          <span className={styles.navItem}>회원 탈퇴</span>
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

        <span className={styles.navItem}>로그아웃</span>

        <span className={styles.navItem}>회원 탈퇴</span>
      </aside>
    </>
  );
}
