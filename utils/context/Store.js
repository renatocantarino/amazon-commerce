import Cookies from 'js-cookie';
import { createContext, useReducer } from 'react';

export const Store = createContext();

const initialState = {
  darkMode: Cookies.get('cookie-theme') === 'ON' ? true : false,
  cart: {
    cartItems: Cookies.get('cookie-cartItems')
      ? JSON.parse(Cookies.get('cookie-cartItems'))
      : [],
  },
};

function reducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_DARK_MODE_ON':
      return { ...state, darkMode: !state.darkMode };
    case 'TOGGLE_DARK_MODE_OFF':
      return { ...state, darkMode: !state.darkMode };
    case 'CART_ADD_ITEM': {
      const newItem = action.payload;
      const existItem = state.cart.cartItems.find(
        (item) => item._id === newItem._id
      );
      const cartItems = existItem
        ? state.cart.cartItems.map((item) =>
            item.name === existItem.name ? newItem : item
          )
        : [...state.cart.cartItems, newItem];

      Cookies.set('cookie-cartItems', JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    }

    default:
      return state;
  }
}

export function StoreProvide(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };

  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
