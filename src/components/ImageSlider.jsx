import { useEffect, useState } from "react";

export default function Slider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [animateKey, setAnimateKey] = useState(currentSlide);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  useEffect(() => {
    const nextSlider = setInterval(() => {
      nextSlide();
    }, 4000);
    setAnimateKey(Date.now()); // force unique key every slide change
    return () => clearInterval(nextSlider);
  }, [currentSlide]);

  // useEffect(() => {
  //   setAnimateKey((prev) => prev + 1); // force re-apply animation
  // });

  const slides = [
    "/slider-images/Slide1.png",
    "/slider-images/Slide2.png",
    "/slider-images/Slide3.png",
  ];

  return (
    <div className="w-full overflow-hidden relative mt-4 px-4">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{
          transform: `translateX(-${currentSlide * 100}%)`,
        }}
      >
        {slides.map((src, idx) => {
          const isFirst = idx === 0;
          const isLast = idx === slides.length - 1;

          // Add padding only if it's not first or last
          const paddingClass = isFirst
            ? "-translate-x-3" // only right padding
            : isLast
            ? "px-2" // only left padding
            : "px-[10px] "; // both sides

          return (
            <div
              key={`${idx} ${animateKey}`}
              className={`flex-shrink-0 ${paddingClass} `}
              style={{
                width: "100%",
                animationDelay: `${0.3}s`,
              }}
            >
              <img
                src={src}
                alt={`Slide ${idx + 1}`}
                // className="w-full object-cover rounded-lg"
                className={`slideStagger ${
                  currentSlide === idx
                    ? "w-full object cover rounded-lg "
                    : "w-full object-cover rounded-lg h-[75%] md:h-[80%] mt-3 md:mt-4"
                }`}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
