import React, { useState } from 'react';
import RootContext from '../context/RootContext';
import { productsDataArray } from '../localData/productsDataArray';
import Router from '../routing/Router';
import GlobalStylesTemplate from '../templates/GlobalStylesTemplate';

const Root = () => {
  const [products, setProducts] = useState([...productsDataArray]);
  const [cartModalOpen, setCartModalOpen] = useState(false);
  const [cart, setCart] = useState([]);

  const handleCartModalOpen = () => {
    setCartModalOpen(true);
  };

  const handleCartModalClose = () => {
    setCartModalOpen(false);
  };

  const addProductToCart = (productId) => {
    const product = products.find((el) => el.id === productId);
    setCart((prev) => [...new Set([...prev, product])]);
  };

  const deleteProductFromCart = (productId) => {
    const newCart = cart.filter((el) => el.id !== productId);
    setCart([...newCart]);
  };

  return (
    <RootContext.Provider
      value={{
        products,
        cartModalOpen,
        cart,
        addProductToCart,
        deleteProductFromCart,
        handleCartModalOpen,
        handleCartModalClose,
      }}
    >
      <GlobalStylesTemplate>
        <Router />
      </GlobalStylesTemplate>
    </RootContext.Provider>
  );
};

export default Root;