import { createContext, useContext, useEffect, useState } from "react";

const LocationContext = createContext();

function LocationProvider({ children }) {
  const [location, setLocation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Check if geolocation is available

  useEffect(() => {
    const fetchLocation = async () => {
      if (!navigator.onLine) {
        setError("You are offline. Please check your internet connection.");
        return;
      }
      setIsLoading(true);
      if ("geolocation" in navigator) {
        console.log("Requesting location...");
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;

            try {
              async function getLocation(lat, lon) {
                // const apiKey = process.env.OPENCAGE_API_KEY;

                const response = await fetch(
                  `/api/location?lat=${lat}&lon=${lon}`
                );
                const data = await response.json();
                console.log(data.data.location);

                if (
                  data.data.location.status.code !== 200 ||
                  data.data.location.results.length === 0
                ) {
                  console.log("error");
                  throw new Error("Failed to fetch location data");
                }
                setLocation(data.data.location.results[0].formatted);
              }

              getLocation(latitude, longitude);
            } catch (err) {
              setError(err.message);
            } finally {
              setIsLoading(false);
            }
          },
          (error) => {
            setIsLoading(false);
            if (error.code === error.PERMISSION_DENIED) {
              setError("User denied access to location.");
            } else if (error.code === error.POSITION_UNAVAILABLE) {
              setError("Location unavailable.");
            } else if (error.code === error.TIMEOUT) {
              setError("Location request timed out.");
            } else {
              setError("Unable to retrieve location.");
            }
          }
        );
      } else {
        setIsLoading(false);
        setError("Geolocation is not supported by this browser.");
      }
    };

    fetchLocation();
  }, []);

  return (
    <LocationContext.Provider
      value={{ location, setLocation, error, isLoading }}
    >
      {children}
    </LocationContext.Provider>
  );
}

function useLocation() {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error("useLocation must be used within a LocationProvider");
  }
  return context;
}
export { LocationProvider, useLocation };
