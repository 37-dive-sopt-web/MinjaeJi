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

export const headerContainer = style({
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "20px 30px",
  boxSizing: "border-box",
  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)",
  backgroundColor: "#dae9f9ff",
  borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
});

export const titleWrapper = style({
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  gap: "10px",
});

export const title = style({
  fontSize: "20px",
  fontWeight: 600,
});

export const subtitle = style({
  fontSize: "15px",
  color: "#565555ff",
});

export const navMenu = style({
  display: "flex",
  gap: "24px",
  "@media": {
    "(max-width: 768px)": {
      display: "none",
    },
  },
});

const activeStyle = {
  fontWeight: 600,
  color: "#6caaedff",
  textDecoration: "underline",
  textDecorationColor: "#7db9f9ff",
};

export const navItem = style({
  cursor: "pointer",
  color: "#4d4d4dff",
  fontSize: "15px",
  transition: "color 0.2s ease, text-decoration-color 0.2s ease",
  textDecoration: "none",

  ":hover": activeStyle,
});

export const activeNavItem = style(activeStyle);

export const hamburger = style({
  display: "none",
  cursor: "pointer",
  fontSize: "24px",
  "@media": {
    "(max-width: 768px)": {
      display: "block",
    },
  },
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
  fontSize: "20px",
});
