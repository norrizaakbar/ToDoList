import Sidebar from "./sidebar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <Sidebar />
      <Outlet />
    </>
  );
}
