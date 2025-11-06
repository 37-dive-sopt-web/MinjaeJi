import { style } from "@vanilla-extract/css";
import { vars } from "../../../styles/theme.css";

export const gameStatusSection = style({
  display: "flex",
  flex: "1",
  flexDirection: "column",
  gap: "15px",
  padding: "20px",
  borderRadius: "10px",
  backgroundColor: vars.color.status,
});
