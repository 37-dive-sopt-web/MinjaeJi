import { style } from "@vanilla-extract/css";

export const overlay = style({
  position: "fixed",
  inset: 0,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
});

export const modal = style({
  background: "#fff",
  borderRadius: "10px",
  padding: "50px 60px",
  textAlign: "center",
  boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
});
