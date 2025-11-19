import { style } from "@vanilla-extract/css";

export const overlay = style({
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(0, 0, 0, 0.19)",
  zIndex: 10,
});

export const sideMenu = style({
  position: "fixed",
  top: 0,
  right: 0,
  width: "220px",
  height: "100vh",
  backgroundColor: "white",
  boxShadow: "-4px 0 6px rgba(0,0,0,0.15)",
  padding: "20px",
  display: "flex",
  flexDirection: "column",
  gap: "40px",
  transform: "translateX(100%)",
  transition: "transform 0.3s ease",
  zIndex: 11,
});

export const sideMenuOpen = style({
  transform: "translateX(0)",
});

export const closeButton = style({
  alignSelf: "flex-end",
  marginBottom: "20px",
  cursor: "pointer",
});

export const navItem = style({
  cursor: "pointer",
  color: "#4d4d4dff",
  fontSize: "15px",
  transition: "color 0.2s ease",
});

export const activeNavItem = style({
  fontWeight: 600,
  color: "#6caaedff",
  textDecoration: "underline",
});
