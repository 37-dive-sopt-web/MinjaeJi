import { style } from "@vanilla-extract/css";

export const container = style({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
  backgroundColor: "#f8f9fb",
  gap: "24px",
  position: "relative",
});

export const backButton = style({
  background: "transparent",
  border: "none",
  cursor: "pointer",
  width: "24px",
  height: "24px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 0,
});

export const form = style({
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  width: "100%",
  maxWidth: "360px",
  backgroundColor: "#fff",
  padding: "32px",
  borderRadius: "16px",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
});

export const title = style({
  fontSize: "22px",
  fontWeight: 700,
  textAlign: "center",
});

export const step = style({
  display: "flex",
  flexDirection: "column",
  gap: "35px",
});

export const label = style({
  display: "flex",
  flexDirection: "column",
  gap: "10px",
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

export const passwordWrapper = style({
  position: "relative",
  display: "flex",
  alignItems: "center",
});

export const toggleButton = style({
  position: "absolute",
  top: "8px",
  right: "10px",
  background: "transparent",
  border: "none",
  cursor: "pointer",
});

export const loginLink = style({
  textAlign: "center",
  fontSize: "14px",
  color: "#007aff",
  background: "transparent",
  border: "none",
  cursor: "pointer",
  selectors: {
    "&:hover": { textDecoration: "underline" },
  },
});

export const errorMessage = style({
  color: "red",
  fontSize: "12px",
});
