import * as styles from "./side-menu.css";
import closeIcon from "@/assets/x-icon.png";

type SideMenuProps = {
  open: boolean;
  onClose: () => void;
  onNavigate: (path: string) => void;
  onLogout: () => void;
  onWithdraw: () => void;
  currentPath: string;
};

export default function SideMenu({
  open,
  onClose,
  onNavigate,
  onLogout,
  onWithdraw,
  currentPath,
}: SideMenuProps) {
  return (
    <>
      {open && <div className={styles.overlay} onClick={onClose} />}

      <aside
        className={`${styles.sideMenu} ${open ? styles.sideMenuOpen : ""}`}
      >
        <span className={styles.closeButton} onClick={onClose}>
          <img src={closeIcon} width={16} height={16} alt="닫기" />
        </span>

        <span
          className={`${styles.navItem} ${
            currentPath === "/my-page" ? styles.activeNavItem : ""
          }`}
          onClick={() => onNavigate("/my-page")}
        >
          내 정보
        </span>

        <span
          className={`${styles.navItem} ${
            currentPath === "/members" ? styles.activeNavItem : ""
          }`}
          onClick={() => onNavigate("/members")}
        >
          회원 조회
        </span>

        <span className={styles.navItem} onClick={onLogout}>
          로그아웃
        </span>

        <span className={styles.navItem} onClick={onWithdraw}>
          회원 탈퇴
        </span>
      </aside>
    </>
  );
}
