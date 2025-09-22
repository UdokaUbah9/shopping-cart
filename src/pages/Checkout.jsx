import { Link, useNavigate } from "react-router-dom";

import Footer from "../components/Footer";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useLocation } from "../context/LocationContext";
import PageWrapper from "../components/PageWrapper";

export default function CheckOut() {
  const [selected, setSelected] = useState(0);
  const [hasCheckedOut, setHasCheckedOut] = useState(false);
  const navigate = useNavigate();
  const { setCartItems, setSearchInput } = useCart();
  const { location } = useLocation();

  const paymentMethod = [
    { id: 0, method: "Credit Card" },
    { id: 1, method: "Paypal" },
    { id: 2, method: "Gift Card" },
    { id: 3, method: "Bank Transfer" },
  ];
  const randomNumber = Math.floor(Math.random() * (50 - 10 + 1)) + 10;

  const handleCheckOut = () => {
    setHasCheckedOut(true);
  };

  const handleAnotherPurchase = function () {
    setHasCheckedOut(false);
    setCartItems([]);
    setSearchInput("");
    navigate("/");
  };

  const handleSelected = (id) => {
    setSelected(id);
    console.log(selected);
  };

  if (hasCheckedOut) {
    return (
      <PageWrapper>
        <div className="relative">
          <h1 className="font-bold text-2xl text-center py-3 px-4 tracking-wide">
            Checkout
          </h1>

          <button
            onClick={handleAnotherPurchase}
            className="absolute top-4 left-4 text-2xl font-bold"
          >
            &larr;
          </button>

          <div className="min-w-[263px] space-y-0">
            <img
              src="/checkout-images/success.png"
              alt="checked out"
              className="mx-auto mt-20"
            />
            <p className="text-limegreenSecondary text-3xl mx-auto min-w-[264px] p-6 text-center font-poppins mb-0">
              Thanks for your patronage
            </p>
            <p className="text-xs md:text-sm text-zinc-700 text-center mt-0 min-w-[100px]">
              Your order #FE54363698 is confirmed and is processing.
            </p>
          </div>
          <p className="bg-limegreenCart py-1 px-7 rounded-full text-limegreenChat mt-32 font-bold font-poppins w-fit mx-auto">
            You have just earned {randomNumber}
          </p>

          <p className="text-poppins text-sm md:text-sm text-center text-limegreenChat mt-10">
            Need assistance? We're here for you if you have any issue or
            question or need support regarding your purchase, reach out to our
            customer suppport.
          </p>

          <Footer type="checkedout" onAnotherPurchase={handleAnotherPurchase} />
        </div>
      </PageWrapper>
    );
  }
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
          <p className="text-xs md:text-lg text-limegreenChat">
            Please note that all orders are typically processed within 1-2
            business days. Once your order has been processed and shipped, you
            will receive a confirmation email with tracking information
          </p>
        </div>
        <div className="md:h-[220px]"></div>
        <Footer type="checkout" onCheckOut={handleCheckOut} />
      </div>
    </PageWrapper>
  );
}
