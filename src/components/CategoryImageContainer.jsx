export default function CategoryImageContainer() {
  // This component displays a list of category images
  // It is used to show different categories of products available in the application
  let categoryImages = [
    { image: "cat1.png", alt: "Pain relief" },
    { image: "cat2.png", alt: "Skin care" },
    { image: "cat3.png", alt: "Health care" },
    { image: "cat4.png", alt: "Eye care" },
    { image: "cat5.png", alt: "Ear care" },
    { image: "cat6.png", alt: "Digestive" },
    { image: "cat7.png", alt: "Immune" },
  ];

  return (
    <>
      <div className="flex justify-between items-center mt-4">
        <p className=" text-zinc-800 font-semibold text-lg">Category</p>
        <p
          //   onClick={toggleShowAll}
          role="button"
          className="text-sm text-zinc-500 cursor-pointer"
        >
          see all
        </p>
      </div>
      <div className="w-full overflow-x-auto overflow-y-hidden mt-2 [scrollbar-width:none]">
        <div className="flex gap-5 mx-auto w-fit">
          {categoryImages.map((path, index) => (
            <div
              key={index}
              className="
          w-[74px] h-[116px] md:w-[110px] bg-limegreenLight rounded-full shadow-sm
          flex flex-col items-center justify-start
           md:h-[180px]
        "
            >
              {/* Image */}
              <img
                src={`/category-images/${path.image}`}
                alt={path.alt}
                className="
    object-contain rounded-full 
    w-14 h-14 md:w-[85px] md:h-[85px] p-[2px]
  "
              />

              {/* Text below */}
              <p
                className="
          text-xs text-zinc-800 mt-4 md:mt-8 font-poppins text-center min-w-[72px]  mx-auto
         md:text-lg
        "
              >
                {path.alt}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
