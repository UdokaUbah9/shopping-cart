import Footer from "../components/Footer";
import PageWrapper from "../components/PageWrapper";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function ThankYu() {
  const navigate = useNavigate();

  const randomNumber = Math.floor(Math.random() * (50 - 10 + 1)) + 10;

  const { setCartItems, setSearchInput } = useCart();

  const handleAnotherPurchase = function () {
    setCartItems([]);
    setSearchInput("");
    navigate("/");
  };
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
            src="/public/checkout-images/success.png"
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
          Need assistance? We're here for you if you have any issue or question
          or need support regarding your purchase, reach out to our customer
          suppport.
        </p>
        <div className="h-[170px] md:h-[220px]"></div>
        <Footer type="checkedout" onAnotherPurchase={handleAnotherPurchase} />
      </div>
    </PageWrapper>
  );
}
