import { createBrowserRouter } from "react-router-dom";
import AppLayout from "./AppLayout";
import HomePage from "../pages/HomePage";
import ThankYou from "../pages/ThankYou";
import Cart from "../pages/CartPage";
import ChatAi from "../pages/ChatAiPage";
import ProfilePage from "../pages/ProfilePage";
import CheckOut from "../pages/Checkout";
import NotFound from "./NotFound";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <NotFound />, // 👈 handles errors + 404
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
      {
        element: <ThankYou />,
        path: "/order-successful",
      },
    ],
  },
]);

export default router;
