import { HiOutlineBell } from "react-icons/hi";
import { FaMapMarkerAlt } from "react-icons/fa";

import { useLocation } from "../context/LocationContext"; // or correct path to your custom hook

export default function Location() {
  const { location, isLoading, error } = useLocation();
  console.log(location);

  return (
    <div>
      <p className="text-left text-zinc-500 font-light mb-0 md:text-sm text-xs">
        location
      </p>
      <div className="flex justify-between items-center mt-0 ">
        <div className="text-zinc-800 font-semibold text-xs md:text-sm">
          <FaMapMarkerAlt className="inline-block" />
          {isLoading ? (
            <em className="text-xs font-light">fetching location...</em>
          ) : (
            !error && location.split(", ").splice(2, 4).join(", ")
          )}

          {error && (
            <span className="text-red-300 text-xs font-light">{error}</span>
          )}
        </div>

        <div className="bg-limegreenLight pl-[4px] md:pl-[7px] rounded-full w-5 h-5 md:w-8 md:h-8">
          <HiOutlineBell
            className="inline-block stroke-black stroke-1 text-sm md:text-xl -translate-y-1 md:translate-y-0.5"
            title="Notifications"
          />
        </div>
      </div>
    </div>
  );
}
