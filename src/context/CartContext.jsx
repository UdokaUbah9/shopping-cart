import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [liked, setLiked] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [messages, setMessages] = useState([]);

  //add Item to cart and increase Quantity
  const addToCart = function (item) {
    const exist = cartItems.find((i) => item.id === i.id);

    if (exist) {
      alert("Item already in cart");
      setCartItems((prevItems) =>
        prevItems.map((prevItem) => {
          if (prevItem.id === item.id) {
            return { ...prevItem, quantity: prevItem.quantity + 1 };
          }
          return prevItem;
        })
      );
    } else {
      setCartItems((prevItems) => [...prevItems, { ...item, quantity: 1 }]);
    }
  };
  //reduct Item from cart and decrease Quantity
  const reductFromCart = function (item) {
    const exist = cartItems.find((i) => item.id === i.id);

    if (exist.quantity === 1) {
      setCartItems((prevItems) =>
        prevItems.filter((prevItem) => prevItem.id !== item.id)
      );
    } else {
      setCartItems((prevItems) =>
        prevItems.map((prevItem) => {
          if (prevItem.id === item.id) {
            return { ...prevItem, quantity: prevItem.quantity - 1 };
          }
          return prevItem;
        })
      );
    }
  };

  const removeFromCart = function (item) {
    const selectedItem = cartItems.find((cart) => cart.id === item.id);
    selectedItem.quantity = 0;

    const filteredCart = cartItems.filter((cartItem) => cartItem.quantity > 0);
    setCartItems(filteredCart);
  };

  const increaseQuantity = function (item) {
    const updatedCart = cartItems.map((cart) => {
      if (cart.id === item.id) {
        return { ...cart, quantity: cart.quantity + 1 };
      }
      return cart;
    });

    setCartItems(updatedCart);
  };

  const decreaseQuantity = function (item) {
    const updatedCart = cartItems.map((cart) => {
      if (cart.id === item.id) {
        return { ...cart, quantity: cart.quantity - 1 }; // Update one
      }

      return cart; // Leave the rest unchanged
    });

    setCartItems(updatedCart.filter((cart) => cart.quantity > 0));
  };

  // Function to handle like toggle
  // This function toggles the like state of an item
  function handleLikeToggle(id) {
    // If the item is already liked, remove it from the liked array
    // This is a simple toggle logic

    console.log(cartItems);
    if (liked.includes(id))
      return setLiked(liked.filter((item) => item !== id));

    // If the item is not liked, add it to the liked array
    // This is a simple toggle logic
    if (!liked.includes(id)) {
      setLiked([...liked, id]);
    }
  }

  //SEARCH INPUT FUNCTION

  const onSearchInput = function (e) {
    setSearchInput(e.target.value);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        reductFromCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        liked,
        handleLikeToggle,
        searchInput,
        onSearchInput,
        messages,
        setMessages,
        setSearchInput,
        setCartItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
export function useCart() {
  const ctx = useContext(CartContext);

  if (!ctx) throw new Error("Context was used outside of its provider");

  return ctx;
}
