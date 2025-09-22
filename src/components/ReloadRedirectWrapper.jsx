import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ReloadRedirectWrapper({ children }) {
  const navigate = useNavigate();
  useEffect(() => {
    // Clear any state or context if needed
    navigate("/", { replace: true });
  }, [navigate]);
  return children;
}
