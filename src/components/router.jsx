import { createBrowserRouter } from "react-router-dom";
import AppLayout from "./AppLayout";

import HomePage from "../pages/HomePage";
import Cart from "../pages/CartPage";
import ChatAi from "../pages/ChatAiPage";
import ProfilePage from "../pages/ProfilePage";
import CheckOut from "../pages/Checkout";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        element: <HomePage />,
        index: true,
      },

      {
        element: <Cart />,
        path: "/cart",
      },
      {
        element: <ChatAi />,
        path: "/support-chat",
      },
      {
        element: <ProfilePage />,
        path: "/user-profile",
      },
      {
        element: <CheckOut />,
        path: "/cart/checkout",
      },
    ],
  },
]);

export default router;
