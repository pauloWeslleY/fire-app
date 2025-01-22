import { useRoutes } from "react-router";
import Login from "../pages/login";
import Register from "../pages/register";
import Admin from "../pages/admin";
import Home from "../pages/home";
import PrivateRoutes from "./private.routes";

export default function RoutesApp() {
  const routes = [
    {
      path: "/",
      element: <Login />,
      index: true,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/admin",
      element: (
        <PrivateRoutes>
          <Admin />
        </PrivateRoutes>
      ),
      children: [
        {
          path: "home",
          element: <Home />,
        },
      ],
    },
  ];

  return useRoutes([...routes]);
}
