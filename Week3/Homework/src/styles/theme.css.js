import { createGlobalTheme } from "@vanilla-extract/css";

// :root에 css 변수 등록
// TODO:
export const vars = createGlobalTheme(":root", {
  color: {
    background: "#fee1e8",
    primary: "#6e3d48ff",
    secondary: "#a95e6eff",
    card: "#e699aaff",
    status: "#ecb9c4ff",
    negative: "#cf2449ff",
  },
  font: {
    base: "Pretendard, sans-serif",
  },
});
