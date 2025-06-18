import DashboardNavbar from "../components/DashboardNavbar";
import DashboardFooter from "../components/DashboardFooter";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <>
      <DashboardNavbar />
      <Outlet />
      <DashboardFooter />
    </>
  );
}
