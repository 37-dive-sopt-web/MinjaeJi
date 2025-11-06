import { createGlobalTheme } from "@vanilla-extract/css";

// :root에 css 변수 등록
// TODO: 변수명 수정
export const vars = createGlobalTheme(":root", {
  color: {
    background: "#fee1e8",
    primary: "#6e3d48ff",
    secondary: "#a95e6eff",
  },
  font: {
    base: "Pretendard, sans-serif",
  },
});
