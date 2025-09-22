import { useEffect, useState } from "react";
import { HiHeart, HiOutlineHeart, HiOutlinePlus } from "react-icons/hi";
import Loader from "./Loader";
import { useCart } from "../context/CartContext";
import Brands from "./Brand";
import AddAndRemoveCart from "./AddAndRemoveCart";

export default function DrugContainer() {
  const [messages, setMessages] = useState([]);
  const [filteredDataSearch1, setFilteredDataSearch1] = useState([]);
  const [filteredDataSearch2, setFilteredDataSearch2] = useState([]);
  const [filteredDataSearch3, setFilteredDataSearch3] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart, cartItems, handleLikeToggle, liked, searchInput } =
    useCart();

  // Fetch data from the server
  // This is a mock API endpoint, replace it with your actual endpoint
  useEffect(() => {
    setLoading(true);
    fetch("/db.json")
      .then((res) => res.json())
      .then((data) => setMessages(data.data))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const filteredData = messages
      .slice(0, 5)
      .filter((item) =>
        item.nutrient.toLowerCase().includes(searchInput.toLowerCase())
      );

    if (searchInput === "") {
      setFilteredDataSearch1(messages.slice(0, 5));
    } else {
      setFilteredDataSearch1(filteredData);
    }
  }, [messages, searchInput]);

  useEffect(() => {
    const filteredData = messages
      .slice(6, 11)
      .filter((item) =>
        item.nutrient.toLowerCase().includes(searchInput.toLowerCase())
      );

    if (searchInput === "") {
      setFilteredDataSearch2(messages.slice(6, 11));
    } else {
      setFilteredDataSearch2(filteredData);
    }
  }, [messages, searchInput]);

  useEffect(() => {
    const filteredData = messages
      .slice(12, 15)
      .filter((item) =>
        item.nutrient.toLowerCase().includes(searchInput.toLowerCase())
      );

    if (searchInput === "") {
      setFilteredDataSearch3(messages.slice(12, 15));
    } else {
      setFilteredDataSearch3(filteredData);
    }
  }, [messages, searchInput]);
  // Render the drug container
  // This component displays a list of drugs with their details
  if (loading) {
    return (
      <div className="w-full text-center flex justify-center items-center mt-6">
        <Loader />
      </div>
    );
  }

  if (
    filteredDataSearch1.length === 0 &&
    filteredDataSearch2.length === 0 &&
    filteredDataSearch3.length === 0
  ) {
    return (
      <div className="w-full text-center flex justify-center items-center mt-6">
        <p>No items found</p>
      </div>
    );
  }

  const checkData1 =
    filteredDataSearch1.length === 5
      ? messages.slice(0, 5)
      : filteredDataSearch1;
  const checkData2 =
    filteredDataSearch2.length === 5
      ? messages.slice(6, 11)
      : filteredDataSearch2;
  const checkData3 =
    filteredDataSearch3.length === 3
      ? messages.slice(12, 15)
      : filteredDataSearch3;

  return (
    <div className="w-full overflow-x-auto py-2">
      <div className="flex gap-4 min-w-full overflow-x-scroll [scrollbar-width:none] overflow-y-hidden">
        {checkData1.map((data, index) => {
          const inCart = cartItems.find((cart) => cart.id === data.id);

          return (
            <div
              key={index}
              className="
            flex-grow bg-limegreenLight p-1 mt-4 rounded-lg
            min-w-[140px] h-[210px] 
           
            md:min-w-[235px] md:h-[285px] 
            lg:min-w-[285px] lg:h-[335px]
          "
            >
              <div
                className="
              relative mx-auto flex items-center justify-center rounded-lg
              min-w-[120px] min-h-[120px] 
              
              md:min-w-[185px] md:min-h-[185px]
              lg:min-w-[225px] lg:min-h-[225px]
              bg-limegreenCart
            "
              >
                <img
                  src={data.path}
                  alt=""
                  className="w-[48px] h-[48px] md:w-[98px] md:h-[98px] object-contain"
                />

                <button onClick={() => handleLikeToggle(data.id)}>
                  {liked.includes(data.id) ? (
                    <HiHeart className="absolute top-0 right-0 w-6 h-6 text-red-500" />
                  ) : (
                    <HiOutlineHeart className="absolute top-0 right-0 w-5 h-5 stroke-limegreenSecondary stroke-1" />
                  )}
                </button>
                {inCart ? (
                  <AddAndRemoveCart cart={inCart} home={true} />
                ) : (
                  <button
                    className="absolute bottom-0 right-0 bg-limegreenSecondary text-zinc-500 p-1 rounded-br-lg stroke-2"
                    onClick={() => addToCart(data)}
                  >
                    <HiOutlinePlus className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
                  </button>
                )}
              </div>

              {/* Text Section */}
              <div className="text-left px-2 space-y-1 mt-2">
                <p className="text-[0.65rem] sm:text-xs md:text-sm text-zinc-500">
                  {data.detail}
                </p>
                <p className="text-sm md:text-lg font-bold text-zinc-800">
                  {data.nutrient}
                </p>
                <p className="text-limegreenSecondary font-poppins font-bold text-sm sm:text-base md:text-lg">
                  ${data.price}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="w-full overflow-x-auto py-2">
        <div className="flex gap-4 min-w-full overflow-x-scroll [scrollbar-width:none] overflow-y-hidden">
          {checkData2.map((data, index) => {
            const inCart = cartItems.find((cart) => cart.id === data.id);

            return (
              <div
                key={index}
                className="
            flex-grow bg-limegreenLight p-1 mt-4 rounded-lg
            min-w-[140px] h-[210px] 
           
           
            md:min-w-[235px] md:h-[285px] 
            lg:min-w-[285px] lg:h-[335px]
          "
              >
                <div
                  className="
              relative mx-auto flex items-center justify-center rounded-lg
              min-w-[120px] min-h-[120px] 
            
               md:min-w-[185px] md:min-h-[185px]
              lg:min-w-[225px] lg:min-h-[225px]
              bg-limegreenCart
            "
                >
                  <img
                    src={data.path}
                    alt=""
                    className="w-[48px] h-[48px] md:w-[98px] md:h-[98px] object-contain"
                  />
                  <button onClick={() => handleLikeToggle(data.id)}>
                    {liked.includes(data.id) ? (
                      <HiHeart className="absolute top-0 right-0 w-6 h-6 text-red-500" />
                    ) : (
                      <HiOutlineHeart className="absolute top-0 right-0 w-5 h-5 stroke-limegreenSecondary stroke-1" />
                    )}
                  </button>
                  {inCart ? (
                    <button className="absolute bottom-0 right-0 bg-limegreenSecondary text-zinc-500 p-1 rounded-br-lg stroke-2">
                      <AddAndRemoveCart cart={inCart} home={true} />
                    </button>
                  ) : (
                    <button
                      className="absolute bottom-0 right-0 bg-limegreenSecondary text-zinc-500 p-1 rounded-br-lg stroke-2"
                      onClick={() => addToCart(data)}
                    >
                      <HiOutlinePlus className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
                    </button>
                  )}
                </div>

                {/* Text Section */}
                <div className="text-left px-2 space-y-1 mt-2">
                  <p className="text-[0.65rem] sm:text-xs md:text-sm text-zinc-500">
                    {data.detail}
                  </p>
                  <p className="text-sm md:text-lg font-bold text-zinc-800">
                    {data.nutrient}
                  </p>
                  <p className="text-limegreenSecondary font-poppins font-bold text-sm sm:text-base md:text-lg">
                    ${data.price}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {filteredDataSearch3.length === 0 ? null : (
        <>
          <Brands />
          <div className="mb-[55px]">
            <p className="font-bold text-lg md:text-xl">
              Recommendation for you
            </p>
            <div className="w-full overflow-x-auto py-2">
              <div className="flex gap-4 min-w-full overflow-x-scroll [scrollbar-width:none] overflow-y-hidden">
                {checkData3.map((data, index) => {
                  const inCart = cartItems.find((cart) => cart.id === data.id);

                  return (
                    <div
                      key={index}
                      className="
            flex-grow bg-limegreenLight p-1 mt-4 rounded-lg
            min-w-[140px] h-[210px] 
          
            
            md:min-w-[235px] md:h-[285px] 
            lg:min-w-[285px] lg:h-[335px]
          "
                    >
                      <div
                        className="
              relative mx-auto flex items-center justify-center rounded-lg
              min-w-[120px] min-h-[120px] 
             
               md:min-w-[185px] md:min-h-[185px]
              lg:min-w-[225px] lg:min-h-[225px]
              bg-limegreenCart
            "
                      >
                        <img
                          src={data.path}
                          alt=""
                          className="w-[48px] h-[48px] md:w-[98px] md:h-[98px] object-contain"
                        />
                        <button onClick={() => handleLikeToggle(data.id)}>
                          {liked.includes(data.id) ? (
                            <HiHeart className="absolute top-0 right-0 w-6 h-6 text-red-500" />
                          ) : (
                            <HiOutlineHeart className="absolute top-0 right-0 w-5 h-5 stroke-limegreenSecondary stroke-1" />
                          )}
                        </button>
                        {inCart ? (
                          <button className="absolute bottom-0 right-0 bg-limegreenSecondary text-zinc-500 p-1 rounded-br-lg stroke-2">
                            <AddAndRemoveCart cart={inCart} home={true} />
                          </button>
                        ) : (
                          <button
                            className="absolute bottom-0 right-0 bg-limegreenSecondary text-zinc-500 p-1 rounded-br-lg stroke-2"
                            onClick={() => addToCart(data)}
                          >
                            <HiOutlinePlus className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
                          </button>
                        )}
                      </div>

                      {/* Text Section */}
                      <div className="text-left px-2 space-y-1 mt-2">
                        <p className="text-[0.65rem] sm:text-xs md:text-sm text-zinc-500">
                          {data.detail}
                        </p>
                        <p className="text-sm  md:text-lg font-bold text-zinc-800">
                          {data.nutrient}
                        </p>
                        <p className="text-limegreenSecondary font-poppins font-bold text-sm sm:text-base md:text-lg">
                          ${data.price}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
