import { style } from "@vanilla-extract/css";
export const gameBoardSection = style({
  width: "60%",
  display: "flex",
  flexDirection: "column",
  marginRight: "20px",
});

export const cardContainer = style({
  display: "grid",
  gap: "10px",
  justifyContent: "center",
});
