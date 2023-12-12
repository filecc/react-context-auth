import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Error404 from "./components/404";
import SinglePost from "./components/SinglePost";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import { checkLogin } from "./lib/utils/utils";
import Layout from "./layout";
import Home from "./components/Home";
import AddPost from "./components/AddPost";

const middleware = async () => {
  const isLogged = await checkLogin();
  if (!isLogged) router.navigate("/login");
  return true;
};

const isUserLogged = async () => {
  const isLogged = await checkLogin();
  if (isLogged) router.navigate("/dashboard");
  return true;
}

const router = createBrowserRouter([
  /* HOME */
  {
    path: "/",
    element: <Home />,
    errorElement: <Error404 />,
  },
  /* POST SLUG */
  {
    path: "blog/:slug",
    element: <SinglePost />,
    errorElement: <Error404 />,
  },
  /* DASHBOARD */
  {
    path: "dashboard",
    element: <Dashboard />,
    errorElement: <Error404 />,
    loader: async () => {
      const isAdmin = await middleware();
      return isAdmin
    },
  },
  /* LOGIN */
  {
    path: "login",
    element: <Login />,
    loader: isUserLogged
  },
  /* LOGOUT */
  {
    path: "logout",
    loader: async () => {
      const res = await fetch("http://localhost:4000/user/logout", {
        credentials: "include",
      });
      const result = await res.json();
      if (result.code === 200) {
        router.navigate("/");
      } else {
        router.navigate("/error");
      }
    },
  },
  /*  CREAT POST */
  {
    path: "dashboard/create",
    element: <AddPost />,
    loader: async () => {
      const isAdmin = await middleware();
      return isAdmin
    },
  }
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Layout>
      <RouterProvider router={router} />
    </Layout>
  </React.StrictMode>
);
