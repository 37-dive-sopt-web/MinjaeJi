import { style } from "@vanilla-extract/css";
import { vars } from "../../styles/theme.css";

// TODO: main 스타일은 공통으로 빼기
export const main = style({
  display: "flex",
  borderRadius: "20px",
  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)",
  backgroundColor: vars.color.background,
  padding: "20px 30px",
  cursor: "default",
});
