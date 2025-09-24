import { HiOutlineBell } from "react-icons/hi";
import { FaMapMarkerAlt } from "react-icons/fa";

import { useLocation } from "../context/LocationContext"; // or correct path to your custom hook

export default function Location() {
  const { location, isLoading, error } = useLocation();
  return (
    <div>
      <p className="text-left text-zinc-500 font-light mb-0 md:text-lg text-base">
        Location
      </p>
      <div className="flex justify-between items-center mt-0 ">
        <div className="text-zinc-800 font-bold text-xl md:text-2xl flex justify-center items-center gap-[3px]">
          <FaMapMarkerAlt className="inline-block" />
          {isLoading ? (
            <em className="text-base font-light">fetching location...</em>
          ) : (
            !error && (
              <div className="flex justify-center items-center gap-1">
                <p className="font-extrabold">
                  {location.split(", ").splice(2, 4).join(", ")}
                </p>
                <span>
                  <img
                    src="/location-images/vector.png"
                    alt="vector"
                    className="translate-y-[2px]"
                  />
                </span>
              </div>
            )
          )}

          {error && (
            <span className="text-red-300 text-base font-light">{error}</span>
          )}
        </div>

        <div className="bg-limegreenLight pl-[10px] md:pl-[14px] rounded-[20px] w-10 h-10 md:w-12 md:h-12">
          <HiOutlineBell
            className="inline-block stroke-black stroke-1 text-xl md:text-2xl translate-y-[5px] md:translate-y-2 "
            title="Notifications"
          />
        </div>
      </div>
    </div>
  );
}
