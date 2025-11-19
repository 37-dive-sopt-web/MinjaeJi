import { style } from "@vanilla-extract/css";

export const container = style({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
  backgroundColor: "#f8f9fb", // 공통 배경화면 색상
  gap: "24px",
});

export const form = style({
  display: "flex",
  flexDirection: "column",
  gap: "25px",
  width: "100%",
  maxWidth: "360px",
  backgroundColor: "#fff",
  padding: "32px",
  borderRadius: "16px",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
});

export const title = style({
  fontSize: "24px",
  fontWeight: 700,
  textAlign: "center",
  marginBottom: "8px",
});

export const label = style({
  display: "flex",
  flexDirection: "column",
  gap: "10px",
});

export const passwordWrapper = style({
  position: "relative",
  display: "flex",
  alignItems: "center",
});

export const input = style({
  flex: 1,
  padding: "10px 40px 10px 12px",
  border: "1px solid #ccc",
  borderRadius: "8px",
  fontSize: "14px",
  outline: "none",
  selectors: {
    "&:focus": {
      borderColor: "#007aff",
      boxShadow: "0 0 0 2px rgba(0, 122, 255, 0.2)",
    },
  },
});

export const toggleButton = style({
  position: "absolute",
  top: "8px",
  right: "10px",
  background: "transparent",
  border: "none",
  cursor: "pointer",
  fontSize: "18px",
});

export const buttonGroup = style({
  display: "flex",
  flexDirection: "column",
  gap: "15px",
});

export const signupButton = style({
  textAlign: "center",
  fontSize: "14px",
  color: "#007aff",
  cursor: "pointer",
  border: "none",
  background: "transparent",
  selectors: {
    "&:hover": {
      textDecoration: "underline",
      fontWeight: 600,
    },
  },
});
