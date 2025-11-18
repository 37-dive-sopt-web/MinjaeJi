import { createPortal } from "react-dom";
import * as styles from "./modal.css";

interface ModalProps {
  type: "alert" | "confirm";
  message: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
}

export default function Modal({
  type,
  message,
  isOpen,
  onClose,
  onConfirm,
}: ModalProps) {
  if (!isOpen) return null;

  const modalRoot = document.getElementById("modal-root") as HTMLElement;

  return createPortal(
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modalBox} onClick={(e) => e.stopPropagation()}>
        <p className={styles.message}>{message}</p>

        {type === "confirm" && (
          <div className={styles.buttons}>
            <button className={styles.cancelBtn} onClick={onClose}>
              취소
            </button>
            <button className={styles.confirmBtn} onClick={onConfirm}>
              확인
            </button>
          </div>
        )}
      </div>
    </div>,
    modalRoot
  );
}
