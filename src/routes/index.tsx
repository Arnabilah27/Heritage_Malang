import Layout from "@/components/Layout";
import Destination from "@/pages/Destination";
import Home from "@/pages/Home";
import Maps from "@/pages/Maps";
// import Review from "@/pages/Review";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/maps", element: <Maps /> },
      { path: "/destination", element: <Destination /> },
    ],
  },
]);
