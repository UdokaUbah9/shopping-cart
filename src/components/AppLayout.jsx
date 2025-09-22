import { Outlet, useLocation } from "react-router-dom";
import { CartProvider } from "../context/CartContext";
import ReloadRedirectWrapper from "./ReloadRedirectWrapper";
import { LocationProvider } from "../context/LocationContext";
import { useEffect, useRef } from "react";

export default function AppLayout() {
  const { pathname } = useLocation();
  const top = useRef(null);

  useEffect(() => {
    top.current.scrollIntoView({ behavior: "auto" });
  }, [pathname]); // runs automatically on route change

  return (
    <LocationProvider>
      <CartProvider>
        <div className="relative min-h-screen">
          <div ref={top}></div>
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
