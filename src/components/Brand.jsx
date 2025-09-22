const brandImages = [
  "/brand-images/brand1.png",
  "/brand-images/brand2.png",
  "/brand-images/brand3.png",
  "/brand-images/brand4.png",
  "/brand-images/brand5.png",
];

export default function Brands() {
  return (
    <>
      <div className="mt-2">
        <p className="font-bold text-lg md:text-xl">Brands</p>
      </div>

      <div className="w-full overflow-x-auto py-2 [scrollbar-width:none]">
        <div className="min-w-[600px] md:min-w-0 flex md:grid md:grid-cols-5 gap-4">
          {brandImages.map((brand, index) => (
            <div
              key={index}
              className="flex-1 h-[72px] rounded shadow-sm flex items-center justify-center bg-limegreenLight"
            >
              <img
                src={brand}
                alt=""
                className="max-w-full max-h-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
