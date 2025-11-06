import { style } from "@vanilla-extract/css";
import { vars } from "../../../styles/theme.css";

// GameBoard 스타일
export const gameBoardSection = style({
  width: "60%",
  display: "flex",
  flexDirection: "column",
  marginRight: "20px",
});

// 공통
export const gameBoardHeader = style({
  display: "flex",
  justifyContent: "space-between",
  color: vars.color.primary,
  marginBottom: "20px",
});

// 공통
export const gameBoardButton = style({
  border: "none",
  padding: "8px 15px",
  borderRadius: "15px",
  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)",
  cursor: "pointer",
  fontSize: "15px",
  fontWeight: "500",
  transition:
    "transform 0.2s ease, box-shadow 0.2s ease, backgroundColor 0.2s ease",
  selectors: {
    "&:hover": {
      color: "white",
      fontWeight: "600",
      transform: "scale(1.05)",
      backgroundColor: vars.color.negative,
      boxShadow: "0 3px 6px rgba(0, 0, 0, 0.16)",
    },
  },
});

// GameBoard의 카드 스타일
export const cardContainer = style({
  display: "grid",
  gap: "10px",
  justifyContent: "center",
});
