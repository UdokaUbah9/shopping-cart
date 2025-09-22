import ReactDOM from "react-dom";
import { Link, NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Footer({ type, onCheckOut, onAnotherPurchase }) {
  const { cartItems, liked, setCartItems, setSearchInput } = useCart();
  const numberItems = cartItems.reduce((acc, cart) => acc + cart.quantity, 0);

  const totalPrice = Number(
    cartItems.reduce((acc, cart) => acc + cart.price * cart.quantity, 0)
  ).toFixed(2);

  if (type === "checkedout") {
    return (
      <div className=" mt-[44px] bg-white fixed text-center bottom-0 left-0 right-0 shadow-lg z-50  max-w-[940px] mx-auto -y-2">
        <button className="max-w-[480px] min-h-[48px] rounded-2xl p-3 border-limegreenSecondary border text-limegreenSecondary bg-white font-bold text-lg tracking-wider w-[100%] h-[100%] mb-4">
          Order Detail
        </button>

        <button
          className="max-w-[480px] min-h-[48px] rounded-2xl p-3 text-limegreenPrimary bg-limegreenSecondary font-bold text-lg tracking-wider w-[100%] h-[100%] mb-4"
          onClick={() => onAnotherPurchase()}
        >
          Another Purchase?
        </button>
      </div>
    );
  }

  if (type === "cart" || type === "checkout" || type === "checkedout")
    return (
      <div className=" bg-white fixed text-center bottom-0 left-0 right-0 shadow-lg z-50  max-w-[940px] mx-auto -y-6">
        <div className="mx-auto">
          <input
            type="number"
            placeholder="add coupon code"
            className="bg-limegreenLight w-[98%] h-[36px] px-3 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-limegreenSecondary"
          />

          <div className="flex justify-between text-zinc-700 px-5 font-light mt-4">
            <div className="text-left">
              <p className="font-semibold text-xl">Total</p>
              <p className="text-sm text-zinc-500">Order and get 34 points</p>
            </div>

            <div className="text-right">
              <p className="font-semibold text-xl">${totalPrice}</p>
              <p className="text-sm text-zinc-500">Free shopping</p>
            </div>
          </div>
        </div>

        <div
          className={`${
            cartItems.length === 0 ? "bg-slate-400" : "bg-limegreenSecondary"
          } p-4 rounded-2xl text-center-[80%] m-auto h-[61px] text-limegreenLight
          `}
        >
          {type === "checkout" && (
            <Link to="/order-successful">
              <button
                className="font-bold text-lg tracking-wider w-[100%] h-[100%]"
                onClick={() => onCheckOut()}
              >
                Check Out
              </button>
            </Link>
          )}

          {type === "cart" && (
            <Link to="/cart/checkout">
              <button
                disabled={cartItems.length === 0}
                className="
                font-bold text-lg tracking-wider  w-[100%] h-[100%]"
              >
                Procced to checkout
              </button>
            </Link>
          )}
        </div>
      </div>
    );

  if (type === "home")
    return ReactDOM.createPortal(
      <div className=" h-[61px] bg-white fixed -bottom-4 left-0 right-0 shadow-lg z-50 m-4 max-w-[1200px] mx-auto md:h-[71px]">
        <div className="bg-limegreenSecondary p-4 rounded-full flex justify-between items-start text-center w-[90%] m-auto h-[61px] md:h-[71px] md:p-6 mx-auto">
          <NavLink to="/" className="relative">
            {({ isActive }) =>
              isActive ? (
                <img
                  src="/footer-icons/active-home.png"
                  alt="home"
                  className="cursor-pointer  translate-y-[-6px]"
                />
              ) : (
                <img
                  src="/footer-icons/home.png"
                  alt="home"
                  className="cursor-pointer"
                />
              )
            }
          </NavLink>

          <NavLink to="/cart" className="relative">
            <img
              src="/footer-icons/bag.png"
              alt="bag"
              className="cursor-pointer"
            />
            {cartItems.length > 0 && (
              <span className="absolute -top-1 -right-1 md:-top-3 md:-right-3  inline-block text-zinc-700 bg-limegreenPrimary rounded-full w-4 h-4 md:w-6 md:h-6 text-xs md:text-sm">
                {numberItems}
              </span>
            )}
          </NavLink>
          <Link className="relative">
            <img
              src="/footer-icons/heart.png"
              alt="heart"
              className="cursor-pointer"
            />
            {liked.length > 0 && (
              <span className="absolute -top-1 -right-1 md:-top-3 md:-right-3 inline-block text-zinc-700 bg-limegreenPrimary rounded-full w-4 h-4 md:w-6 md:h-6 text-xs md:text-sm ">
                {liked.length}
              </span>
            )}
          </Link>

          <NavLink to="/support-chat" className="relative">
            {({ isActive }) =>
              isActive ? (
                <img
                  src="/footer-icons/active-chat.png"
                  alt="home"
                  className="cursor-pointer translate-y-[-6px]"
                />
              ) : (
                <img
                  src="/footer-icons/chat.png"
                  alt="home"
                  className="cursor-pointer"
                />
              )
            }
          </NavLink>

          <NavLink to="/user-profile" className="relative">
            {({ isActive }) =>
              isActive ? (
                <img
                  src="/footer-icons/profile-active.png"
                  alt="home"
                  className="cursor-pointer translate-y-[-6px] w-[38px] h-[37px] rounded-full"
                />
              ) : (
                <img
                  src="/footer-icons/profile.png"
                  alt="home"
                  className="cursor-pointer"
                />
              )
            }
          </NavLink>
        </div>
      </div>,
      document.getElementById("container")
    );
}
