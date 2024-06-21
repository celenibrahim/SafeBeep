import React, {createContext, useState, useContext} from 'react';
export const CartContext = createContext();

export const CartProvider = ({children}) => {
  const [subtotal, setSubtotal] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [change, setChange] = useState(0);
  const contextValues = {
    subtotal,
    setSubtotal,
    totalPrice,
    setTotalPrice,
    change,
    setChange,
  };

  return (
    <CartContext.Provider value={contextValues}>
      {children}
    </CartContext.Provider>
  );
};
export const useCart = () => {
  return useContext(CartContext);
};
