import { style } from "@vanilla-extract/css";
import { vars } from "../../styles/theme.css";

// 공통인데... flex 뺀...
export const main = style({
  height: "100%",
  borderRadius: "20px",
  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)",
  backgroundColor: vars.color.background,
  padding: "20px 30px 50px 30px",
  cursor: "default",
});

// 공통인데...
export const gameBoardSection = style({
  width: "60%",
  display: "flex",
  flexDirection: "column",
  marginRight: "20px",
});

// 공통...
export const gameBoardButton = style({
  border: "none",
  padding: "8px 15px",
  borderRadius: "15px",
  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)",
  cursor: "pointer",
  fontSize: "15px",
  fontWeight: "500",
  transition:
    "transform 0.2s ease, box-shadow 0.2s ease, backgroundColor 0.2s ease",
  selectors: {
    "&:hover": {
      color: "white",
      fontWeight: "600",
      transform: "scale(1.05)",
      backgroundColor: vars.color.negative,
      boxShadow: "0 3px 6px rgba(0, 0, 0, 0.16)",
    },
  },
});

// 공통
export const gameBoardHeader = style({
  display: "flex",
  justifyContent: "space-between",
  color: vars.color.primary,
  marginBottom: "20px",
});

export const rankingTable = style({
  width: "100%",
  borderCollapse: "collapse",
  textAlign: "center",
  fontSize: "15px",
  backgroundColor: "#fff",
  borderRadius: "12px",
  overflow: "hidden",
  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
});

export const th = style({
  backgroundColor: vars.color.primary,
  color: "#fff",
  padding: "12px 10px",
  fontWeight: 600,
});

export const td = style({
  padding: "10px 12px",
  borderBottom: "1px solid #e0e0e0",
  selectors: {
    "&:last-child": { color: "#666" },
  },
});

export const tr = style({
  selectors: {
    "&:nth-child(even)": {
      backgroundColor: "#fafafa",
    },
    "&:hover": {
      backgroundColor: "#f5faff",
    },
  },
});

export const emptyMessage = style({
  color: "#999",
  fontSize: "17px",
  fontWeight: 600,
  marginTop: "30px",
});
