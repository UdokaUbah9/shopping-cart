import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";
import BackButton from "../components/BackButton";
import AddAndRemoveCart from "../components/AddAndRemoveCart";

export default function Cart() {
  const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity } =
    useCart();

  if (cartItems.length === 0)
    return (
      <div className="relative">
        <BackButton />
        <h1 className="font-bold text-2xl text-center py-3 px-4 tracking-wide">
          Shopping Cart
        </h1>
        <div className="bg-limegreenPrimary p-8 mt-8">
          <img
            src="/cartpage-images/emptycart.png"
            alt="Empty Cart"
            className="mx-auto"
          />
          <p className="text-center text-gray-500">No item in your cart</p>
        </div>
        <Footer type="cart" />
      </div>
    );

  return (
    <div className="relative">
      <div className="sticky top-0 bg-white h-[80px]">
        <Link to="/">
          <button className="absolute top-3 left-1 text-2xl">&larr; </button>
        </Link>
        <h1 className="font-semibold tracking-wider text-xl text-center py-3 px-4 mb-4">
          Shopping Cart
        </h1>
      </div>
      <div>
        {cartItems.map((cart, index) => (
          <div
            className=" bg-limegreenLight mb-4 py-3 px-4 flex gap-1"
            key={index}
          >
            <div className="bg-limegreenCart py-3 px-2">
              <img
                src={cart.path}
                alt={cart.nutrient}
                className="w-[64px] h-[69px]"
              />
            </div>

            <div className="flex justify-between w-full">
              <div className="ml-2">
                <p className="font-semibold text-lg">{cart.nutrient}</p>
                <p className="text-xs tracking-wide">1000mg</p>
                <p className="mt-3 font-bold text-limegreenSecondary font-inter">
                  ${cart.price}
                </p>
              </div>

              <div>
                <p
                  className="cursor-pointer text-2xl text-right"
                  onClick={() => removeFromCart(cart)}
                >
                  &times;
                </p>
                <div className="mt-4 flex justify-center items-center gap-3">
                  <AddAndRemoveCart cart={cart} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="h-[176px]"></div>
      <Footer type="cart" />
    </div>
  );
}
