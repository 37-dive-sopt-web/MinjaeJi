import { globalStyle, style } from "@vanilla-extract/css";
import { vars } from "../../styles/theme.css";

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

globalStyle(`${rankingTable} th`, {
  backgroundColor: vars.color.primary,
  color: "#fff",
  padding: "12px 10px",
  fontWeight: 600,
});

globalStyle(`${rankingTable} td`, {
  padding: "10px 12px",
  borderBottom: "1px solid #e0e0e0",
});

globalStyle(`${rankingTable} td:last-child`, {
  color: "#666",
});

globalStyle(`${rankingTable} tr`, {
  fontWeight: 600,
});

export const noResultMessage = style({
  color: "#999",
  fontSize: "17px",
  fontWeight: 600,
  marginTop: "30px",
});
