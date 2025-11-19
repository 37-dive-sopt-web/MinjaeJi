import * as styles from "./header.css";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import hamburgerIcon from "@/assets/hamburger-icon.png";
import { authStorage } from "@/utils/authStorage";
import { deleteUserInfo } from "@/apis/users/users.api";
import SideMenu from "./SideMenu";
import Modal from "../Modal/Modal";

export default function Header() {
  const userInfo = authStorage.getUserInfo();
  const [openSideMenu, setOpenSideMenu] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalAction, setModalAction] = useState<() => void>(() => {});

  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigate = (path: string) => {
    navigate(path);
    setOpenSideMenu(false);
  };

  const openConfirmModal = (message: string, action: () => void) => {
    setModalMessage(message);
    setModalAction(() => action);
    setModalOpen(true);
  };

  const handleLogout = () => {
    authStorage.clearAuth();
    navigate("/login");
  };

  const handleWithdraw = async () => {
    try {
      const userId = authStorage.getUserId();
      if (!userId) throw new Error("사용자 ID가 없습니다.");

      await deleteUserInfo(userId);
      navigate("/login");
    } catch {
      alert("회원 탈퇴에 실패했습니다."); //TODO: 실패한 이유... 모달 추가
    }
  };

  return (
    <>
      <header className={styles.headerContainer}>
        <div className={styles.titleWrapper}>
          <div className={styles.title}>마이페이지 😋</div>
          <span className={styles.subtitle}>
            안녕하세요 {userInfo?.name}님!
          </span>
        </div>

        <nav className={styles.navMenu}>
          <span
            className={`${styles.navItem} ${
              location.pathname === "/my-page" ? styles.activeNavItem : ""
            }`}
            onClick={() => handleNavigate("/my-page")}
          >
            내 정보
          </span>

          <span
            className={`${styles.navItem} ${
              location.pathname === "/members" ? styles.activeNavItem : ""
            }`}
            onClick={() => handleNavigate("/members")}
          >
            회원 조회
          </span>

          <span
            className={styles.navItem}
            onClick={() =>
              openConfirmModal("정말 로그아웃 하시겠습니까?", handleLogout)
            }
          >
            로그아웃
          </span>

          <span
            className={styles.navItem}
            onClick={() =>
              openConfirmModal("정말 탈퇴하시겠습니까?", handleWithdraw)
            }
          >
            회원 탈퇴
          </span>
        </nav>

        <div className={styles.hamburger} onClick={() => setOpenSideMenu(true)}>
          <img src={hamburgerIcon} width={16} height={16} />
        </div>
      </header>

      <SideMenu
        open={openSideMenu}
        onClose={() => setOpenSideMenu(false)}
        onNavigate={handleNavigate}
        onLogout={() =>
          openConfirmModal("정말 로그아웃 하시겠습니까?", handleLogout)
        }
        onWithdraw={() =>
          openConfirmModal("정말 탈퇴하시겠습니까?", handleWithdraw)
        }
        currentPath={location.pathname}
      />

      <Modal
        type="confirm"
        message={modalMessage}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={() => {
          modalAction();
          setModalOpen(false);
        }}
      />
    </>
  );
}
