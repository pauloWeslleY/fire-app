import { Navigate, Outlet, useLocation } from "react-router";

export default function Admin() {
  const { pathname } = useLocation();

  if (["/admin", "/admin/"].includes(pathname)) {
    return <Navigate to="/admin/home" />;
  }

  return <Outlet />;
}
