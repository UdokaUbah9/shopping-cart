import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import { useState } from "react";
import { useLocation } from "../context/LocationContext";
import PageWrapper from "../components/PageWrapper";

export default function CheckOut() {
  const [selected, setSelected] = useState(0);

  const { location } = useLocation();

  const paymentMethod = [
    { id: 0, method: "Credit Card" },
    { id: 1, method: "Paypal" },
    { id: 2, method: "Gift Card" },
    { id: 3, method: "Bank Transfer" },
  ];

  const handleSelected = (id) => {
    setSelected(id);
  };

  return (
    <PageWrapper>
      <div className="relative">
        <h1 className="font-bold text-2xl text-center py-3 px-4 tracking-wide">
          Checkout
        </h1>
        <Link to="/cart">
          <button className="absolute top-4 left-4 text-2xl font-bold">
            &larr;
          </button>
        </Link>
        <div className="flex justify-between text-center align-center mt-1">
          <p>Shipping information</p>
          <p>Edit</p>
        </div>

        <div className="flex items-center justify-between p-4 my-4 gap-2">
          <img src="/checkout-images/location-pin.png" alt="location pin" />
          <div className="flex-1">
            <p className="text-sm md:text-lg font-light">Standard Shipping</p>
            <p className="text-limegreenChat text-xs md:text-sm">
              {location?.split(", ").splice(0, 2).join(", ")}
            </p>
            <p className="text-limegreenChat text-xs md:text-sm">
              {location.split(", ").splice(2, 4).join(", ")}
            </p>
          </div>
          <img src="/checkout-images/down.png" alt="edit icon" />
        </div>

        <div className=" space-y-3">
          <h2 className="font-bold text-lg md:text-2xl">Payment Method</h2>
          {paymentMethod.map((pay, idx) => (
            <div
              onClick={() => handleSelected(idx)}
              className={`${
                selected === idx
                  ? "border border-limegreenSecondary rounded-lg flex items-center justify-between"
                  : ""
              } text-sm md:text-lg cursor-pointer flex text-left p-4`}
              key={idx}
            >
              <button>{pay.method}</button>
              {selected === idx && (
                <img src="/checkout-images/selected.png" alt="selected dot" />
              )}
            </div>
          ))}
          <p className="text-xs md:text-lg font-inter text-limegreenChat">
            Please note that all orders are typically processed within 1-2
            business days. Once your order has been processed and shipped, you
            will receive a confirmation email with tracking information
          </p>
        </div>
        <div className="h-[170px] md:h-[220px]"></div>

        <Footer type="checkout" />
      </div>
    </PageWrapper>
  );
}
