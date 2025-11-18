import { Outlet, useLocation } from "react-router-dom";
import Header from "@/components/Header/Header";

export default function Layout() {
  const location = useLocation();

  const hideHeader = ["/login", "/sign-up"].includes(location.pathname);

  return (
    <>
      {!hideHeader && <Header />}
      <Outlet />
    </>
  );
}
