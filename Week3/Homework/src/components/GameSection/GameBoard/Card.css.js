import { style } from "@vanilla-extract/css";
import { vars } from "../../../styles/theme.css";

export const card = style({
  width: "100px",
  height: "100px",
  perspective: "1000px",
  cursor: "pointer",
  borderRadius: "10px",
  transition: "transform 0.4s ease",
  selectors: {
    "&:hover": {
      transform: "scale(1.05)",
    },
  },
});
export const matched = style({
  boxShadow: "0 0 4px 4px rgba(245, 150, 206, 0.6)",
  transition: "boxShadow 0.3s ease-in-out",
});

export const cardInner = style({
  position: "relative",
  width: "100%",
  height: "100%",
  transformStyle: "preserve-3d",
  transition: "transform 0.6s",
  selectors: {
    "&.flipped": { transform: "rotateY(180deg)" },
  },
});

export const cardFace = style({
  position: "absolute",
  width: "100%",
  height: "100%",
  backfaceVisibility: "hidden",
  borderRadius: "10px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "20px",
  fontWeight: "bold",
  boxShadow: "0 2px 5px rgba(0,0,0,0.15)",
});

export const front = style([
  cardFace,
  { backgroundColor: "#f0f0f0", transform: "rotateY(180deg)" },
]);

export const back = style([
  cardFace,
  { backgroundColor: vars.color.card, color: "white" },
]);
