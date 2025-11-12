import { style } from "@vanilla-extract/css";

export const wrapper = style({
  position: "relative",
  width: "100%",
});

export const selected = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "8px 12px",
  borderRadius: "8px",
  cursor: "pointer",
  backgroundColor: "#f7e6eaff",
  fontWeight: "600",
});

export const options = style({
  position: "absolute",
  top: "100%",
  left: 0,
  right: 0,
  backgroundColor: "#f7e6eaff",
  borderRadius: 8,
  marginTop: 4,
  overflow: "hidden",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  zIndex: 100,
});

export const option = style({
  fontSize: "15px",
  padding: "8px 12px",
  cursor: "pointer",
  selectors: {
    "&:hover": { backgroundColor: "#f5f5f5", fontWeight: "600" },
  },
});

export const chevron = style({
  marginLeft: "8px",
  transition: "transform 0.4s",
});

export const chevronOpen = style([chevron, { transform: "rotate(180deg)" }]);
