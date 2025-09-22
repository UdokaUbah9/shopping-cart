import { useCart } from "../context/CartContext";

export default function AddAndRemoveCart({ cart, home }) {
  const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity } =
    useCart();
  return (
    <div
      className={`mt-4 flex justify-center items-center gap-3 h-6 ${
        home ? "absolute bottom-0 right-0" : ""
      }`}
    >
      <button
        className={`text-2xl font-bold flex justify-center items-center w-6 h-6 rounded leading-none
  ${home ? "bg-white text-zinc-700" : "bg-white text-limegreenSecondary"}`}
        onClick={() => decreaseQuantity(cart)}
      >
        &minus;
      </button>
      <span>{cart.quantity}</span>
      <button
        className={`text-2xl font-bold flex justify-center items-center w-6 h-6 rounded leading-none
  ${home ? "bg-white text-zinc-700" : "bg-white text-limegreenSecondary"}`}
        onClick={() => increaseQuantity(cart)}
      >
        &#43;
      </button>
    </div>
  );
}
