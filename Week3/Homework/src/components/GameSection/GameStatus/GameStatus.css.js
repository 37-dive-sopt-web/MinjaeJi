import { style } from "@vanilla-extract/css";
import { vars } from "../../../styles/theme.css";

export const gameStatusSection = style({
  display: "flex",
  flex: "1",
  flexDirection: "column",
  minHeight: 0,
  gap: "15px",
  padding: "20px",
  borderRadius: "10px",
  backgroundColor: vars.color.status,
});

export const pairStat = style({
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: 10,
});

export const pairContainer = style({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: 10,
  backgroundColor: "#f7f6f6ac",
  borderRadius: 15,
  padding: 12,
});

export const title = style({
  fontWeight: 600,
  fontSize: 15,
});
export const content = style({
  fontWeight: 700,
  fontSize: 20,
});

export const infoTitle = style({
  margin: 0,
  fontWeight: 700,
  fontSize: 17,
});

export const infoContent = style({
  display: "flex",
  backgroundColor: "#f7f6f6ac",
  borderRadius: 10,
  padding: "10px 20px",
  fontWeight: 700,
  fontSize: 17,
  justifyContent: "space-between",
});

export const historyContainer = style({
  height: 150,
  display: "flex",
  flexDirection: "column",
  gap: 10,
  overflowY: "auto",
  borderRadius: 8,
  selectors: {
    "&::-webkit-scrollbar": { display: "none" },
  },
});

export const historyPair = style({
  fontFamily: "monospace",
  color: "#333",
});

export const historyResult = style({
  fontWeight: 600,
  selectors: {
    "&.success": { color: "#2e8b57" },
    "&.fail": { color: "#d9534f" },
  },
});
