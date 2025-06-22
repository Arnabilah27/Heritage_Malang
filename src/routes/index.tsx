import Layout from "@/components/Layout";
import Destination from "@/pages/Destination";
import Home from "@/pages/Home";
import Maps from "@/pages/Maps";
import Ulasan from "@/pages/Ulasan";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/peta", element: <Maps /> },
      { path: "/destinasi", element: <Destination /> },
      { path: "/ulasan", element: <Ulasan /> },
    ],
  },
]);
