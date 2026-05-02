import React, { createContext, useContext, useReducer } from 'react';

const CartContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD': {
      const exists = state.find(i => i.id === action.product.id);
      if (exists) return state.map(i => i.id === action.product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...state, { ...action.product, qty: 1 }];
    }
    case 'UPDATE_QTY':
      return state.map(i => i.id === action.id ? { ...i, qty: action.qty } : i).filter(i => i.qty > 0);
    case 'REMOVE':
      return state.filter(i => i.id !== action.id);
    case 'CLEAR':
      return [];
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(reducer, []);

  const addToCart   = (product) => dispatch({ type: 'ADD', product });
  const updateQty   = (id, qty) => dispatch({ type: 'UPDATE_QTY', id, qty });
  const removeItem  = (id)      => dispatch({ type: 'REMOVE', id });
  const clearCart   = ()        => dispatch({ type: 'CLEAR' });

  const total     = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const itemCount = cart.reduce((s, i) => s + i.qty, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQty, removeItem, clearCart, total, itemCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
