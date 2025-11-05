import { style } from "@vanilla-extract/css";

export const header = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  borderRadius: "20px",
  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)",
  backgroundColor: "#fee1e8",
  color: "#6e3d48ff",
  padding: "20px 30px",
  cursor: "default",
});

export const buttonGroup = style({
  display: "flex",
  gap: "10px",
});

export const button = style({
  border: "none",
  padding: "8px 20px",
  borderRadius: "15px",
  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)",
  cursor: "pointer",
  fontSize: "15px",
  fontWeight: "500",
  transition: "transform 0.2s ease, box-shadow 0.2s ease",
  selectors: {
    "&:hover": {
      transform: "scale(1.05)",
      boxShadow: "0 3px 6px rgba(0, 0, 0, 0.16)",
    },
  },
});
