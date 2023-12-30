import { createContext, useReducer } from 'react';

const CartContext = createContext({
  items: '',
  addItem: (item) => {},
  removeItem: (id) => {},
});
// ? Reducer function
// ? Here we write actions that we expect to be executed with help of dispatches.
const cartReducer = (state, action) => {
  // ?  adding an element
  if (action.type === 'ADD_ITEM') {
    //   ! never mutate the state like this !!!
    // state.items.push(action.item);
    const existingCartItemIdx = state.items.find((item) => item.id === action.item.id);
    //   creating a copy not to mutate state
    const updatedItems = [...state.items];
    //   ! If we found an element (item exists)
    if (existingCartItemIdx > -1) {
      const existingItem = state.items[existingCartItemIdx];
      console.log(existingItem);
      const updatedItem = {
        //   if the item exists we spread it and just update the quantity
        ...existingItem,
        quantity: existingItem.quantity + 1,
      };
      // Overwriting our item
      updatedItems[existingCartItemIdx] = updatedItem;
    } else {
      // adding to cart as a new item
      // it starts with quantity of 1
      updatedItems.push({ ...action.item, quantity: 1 });
    }
    return { ...state, items: updatedItems };
  }
  // ?   removing item
  if (action.type === 'REMOVE_ITEM') {
    const existingCartItemIdx = state.items.find((item) => item.id === action.id);
    //   find an existing element
    const existingCartItem = state.items[existingCartItemIdx];

    const updatedItems = [state.items];
    if (existingCartItem.quantity === 1) {
      // we want to remove item
      updatedItems.splice(existingCartItemIdx, 1);
    } else {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity - 1,
      };

      updatedItems[existingCartItem] = updatedItem;
    }
    return { ...state, items: updatedItems };
  }
};

export const CartContextProvider = ({ children }) => {
  // ! useReducer also helps us to deal with state
  const [cartState, dispatchCart] = useReducer(cartReducer, { items: [] });

  const addItem = (item) => {
    dispatchCart({ type: 'ADD_ITEM', item });
    console.log(cartState);
  };
  const removeItem = (id) => {
    dispatchCart({ type: 'REMOVE_ITEM', id });
  };

  const cartContext = {
    items: cartState.items,
    addItem,
    removeItem,
  };

  return <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>;
};

export default CartContext;
