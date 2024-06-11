import { createContext, useState } from "react";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  //Shopping cart -> List Items
  const [shoppingCart, setShoppingCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [userToken, setUserToken] = useState("");
  const [user, setUser] = useState(false);

  return (
    <CartContext.Provider
      value={{
        shoppingCart,
        products,
        setProducts,
        setShoppingCart,
        isCartOpen,
        setIsCartOpen,
        totalPrice,
        setTotalPrice,
        userToken,
        setUserToken,
        user,
        setUser,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartProvider };
