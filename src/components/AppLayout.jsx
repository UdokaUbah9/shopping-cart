import { Outlet } from "react-router-dom";
import { CartProvider } from "../context/CartContext";
import ReloadRedirectWrapper from "./ReloadRedirectWrapper";
import { LocationProvider } from "../context/LocationContext";

export default function AppLayout() {
  return (
    <LocationProvider>
      <CartProvider>
        <div className="relative min-h-screen">
          <div className="flex-1">
            <ReloadRedirectWrapper>
              <Outlet />
            </ReloadRedirectWrapper>
          </div>
        </div>
      </CartProvider>
    </LocationProvider>
  );
}
