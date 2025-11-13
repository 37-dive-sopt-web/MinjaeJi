import { style } from "@vanilla-extract/css";

export const button = style({
  width: "100%",
  padding: "12px 0",
  border: "none",
  borderRadius: "8px",
  backgroundColor: "#007aff",
  color: "#fff",
  fontWeight: 600,
  fontSize: "15px",
  cursor: "pointer",
  transition: "background-color 0.2s ease",
  selectors: {
    "&:hover": {
      backgroundColor: "#0066d6",
    },
    "&:disabled": {
      backgroundColor: "#a0c8ff",
      cursor: "not-allowed",
    },
  },
});
