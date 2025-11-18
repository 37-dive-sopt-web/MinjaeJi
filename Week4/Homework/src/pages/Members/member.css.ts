import { style } from "@vanilla-extract/css";

export const container = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-start",
  paddingTop: "80px",
  minHeight: "100vh",
  backgroundColor: "#f8f9fb",
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
  marginBottom: "10px",
});

export const label = style({
  display: "flex",
  flexDirection: "column",
  gap: "10px",
});

export const input = style({
  padding: "10px 12px",
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

export const resultBox = style({
  marginTop: "20px",
  padding: "20px",
  borderRadius: "12px",
  backgroundColor: "#f1f5ff",
  boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  fontSize: "14px",
});

export const resultRow = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "6px 0",
  fontSize: "14px",
});

export const resultLabel = style({
  fontWeight: 600,
  color: "#333",
});

export const resultValue = style({
  color: "#555",
  fontWeight: 400,
  maxWidth: "180px",
  textAlign: "right",
});
