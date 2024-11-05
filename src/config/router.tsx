import { createBrowserRouter, redirect } from "react-router-dom";
import Login from "../components/login";
import Signup from "../components/signup";
import Home from "../components/home";
import RootLayout from "../components/root-layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
        loader: () => {
          if (!localStorage.getItem("token")) {
            return redirect("/auth/login");
          }
          return null;
        },
      },
      {
        path: "/auth/login",
        element: <Login />,
      },
      {
        path: "/auth/signup",
        element: <Signup />,
      },
    ],
  },
  {
    path: "/auth/logout",
    loader: () => {
      localStorage.removeItem("token");
      return redirect("/auth/login");
    },
  },
]);

export default router;
