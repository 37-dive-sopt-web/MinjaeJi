import * as styles from "./level-select.css";
import { useState, useEffect, useRef } from "react";
import dropDownIcon from "../../assets/drop-down.png";

const levels = [
  { value: 1, label: "Level 1" },
  { value: 2, label: "Level 2" },
  { value: 3, label: "Level 3" },
];

export function LevelSelect({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const selected = levels.find((l) => l.value === value);

  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={wrapperRef} className={styles.wrapper}>
      <div className={styles.selected} onClick={() => setOpen((o) => !o)}>
        <span>{selected?.label ?? "레벨 선택"}</span>
        <img
          src={dropDownIcon}
          alt="dropdown"
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
