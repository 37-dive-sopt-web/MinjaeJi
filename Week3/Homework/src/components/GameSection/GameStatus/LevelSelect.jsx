import { useState } from "react";
import * as styles from "./LevelSelect.css";
import DropDownIcon from "../../../assets/down.png";

const levels = [
  { value: 1, label: "Level 1" },
  { value: 2, label: "Level 2" },
  { value: 3, label: "Level 3" },
];

export function LevelSelect({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const selected = levels.find((l) => l.value === value);

  return (
    <div className={styles.wrapper}>
      <div className={styles.selected} onClick={() => setOpen((o) => !o)}>
        <span>{selected?.label ?? "레벨 선택"}</span>
        <img
          src={DropDownIcon}
          className={open ? styles.chevronOpen : styles.chevron}
          width={16}
          height={16}
        />
      </div>

      {open && (
        <div className={styles.options}>
          {levels.map((level) => (
            <div
              key={level.value}
              className={styles.option}
              onClick={() => {
                onChange(level.value);
                setOpen(false);
              }}
            >
              {level.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
