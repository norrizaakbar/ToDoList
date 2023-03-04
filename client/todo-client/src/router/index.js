import { createBrowserRouter, redirect } from "react-router-dom";
import Layout from "../pages/layout";
import Login from "../pages/login";
import Register from "../pages/register";

const router = createBrowserRouter([
  {
    path: "register",
    element: <Register />,
  },
  {
    path: "login",
    element: <Login />,
    loader: () => {
      const token = localStorage.access_token;
      if (token) {
        throw redirect("/");
      }
      return null;
    },
  },
  {
    path: "",
    element: <Layout />,
    loader: () => {
      const token = localStorage.access_token;
      if (!token) {
        throw redirect("/login");
      }
      return null;
    },
  },
]);

export default router;
