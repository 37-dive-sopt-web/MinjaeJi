import { style } from "@vanilla-extract/css";

export const overlay = style({
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  background: "rgba(0,0,0,0.4)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
});

export const modalBox = style({
  width: "320px",
  backgroundColor: "#fff",
  padding: "50px 24px",
  borderRadius: "20px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
  display: "flex",
  flexDirection: "column",
  gap: "30px",
});

export const message = style({
  whiteSpace: "pre-line",
  fontSize: "17px",
  textAlign: "center",
  lineHeight: 1.5,
});

export const buttons = style({
  display: "flex",
  gap: "10px",
});

export const cancelBtn = style({
  width: "50%",
  fontSize: "15px",
  padding: "8px 14px",
  background: "#e0e0e0",
  borderRadius: "8px",
  border: "none",
  cursor: "pointer",
  transition: "background 0.2s ease",

  ":hover": {
    background: "#d5d5d5",
  },
});

export const confirmBtn = style({
  width: "50%",
  padding: "8px 14px",
  fontSize: "15px",
  background: "#007aff",
  color: "#fff",
  borderRadius: "8px",
  border: "none",
  cursor: "pointer",
  transition: "background 0.2s ease",

  ":hover": {
    background: "#006ae0",
  },
});
