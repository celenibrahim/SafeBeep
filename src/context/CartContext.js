import React, {createContext, useState} from 'react';
export const CartContext = createContext();

export const CartProvider = ({children}) => {
  const [CartInfo, setCartInfo] = useState({
    productId: '',
    productName: '',
    price: '',
    isFavourite: false,
  });

  return (
    <CartContext.Provider value={{CartInfo, setCartInfo}}>
      {children}
    </CartContext.Provider>
  );
};
