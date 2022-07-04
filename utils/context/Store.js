import Cookies from 'js-cookie';
import { createContext, useReducer } from 'react';

export const Store = createContext();

const initialState = {
  darkMode: Cookies.get('cookie-theme') === 'ON' ? true : false,
  userInfo: Cookies.get('cookie-userInfo')
    ? JSON.parse(Cookies.get('cookie-userInfo'))
    : null,
  cart: {
    cartItems: Cookies.get('cookie-cartItems')
      ? JSON.parse(Cookies.get('cookie-cartItems'))
      : [],
    shippingAddress: Cookies.get('cookie-shipping')
      ? JSON.parse(Cookies.get('cookie-shipping'))
      : {},
    paymentMethod: Cookies.get('cookie-paymentMethod')
      ? Cookies.get('cookie-paymentMethod')
      : '',
  },
};

function reducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_DARK_MODE_ON': {
      const _darkTheme = !state.darkMode;
      Cookies.set('cookie-theme', _darkTheme ? 'ON' : 'OFF');
      return { ...state, darkMode: _darkTheme };
    }

    case 'SAVE_PAYMENT_METHOD': {
      Cookies.set('cookie-paymentMethod', JSON.stringify(action.payload));
      return {
        ...state,
        cart: { ...state.cart, paymentMethod: action.payload },
      };
    }

    case 'CART_CLEAR': {
      Cookies.remove('cookie-cartItems');
    }

    case 'USER_LOGIN': {
      Cookies.set('cookie-userInfo', JSON.stringify(action.payload));
      return { ...state, userInfo: action.payload };
    }

    case 'USER_LOGOUT': {
      Cookies.remove('cookie-userInfo');
      Cookies.remove('cookie-cartItems');
      Cookies.remove('cookie-shipping');
      Cookies.remove('cookie-paymentMethod');

      return { ...state, userInfo: null, cart: { cartItems: [] } };
    }

    case 'TOGGLE_DARK_MODE_OFF': {
      const _darkTheme = !state.darkMode;
      Cookies.set('cookie-theme', _darkTheme ? 'ON' : 'OFF');
      return { ...state, darkMode: _darkTheme };
    }

    case 'CART_REMOVE_ITEM': {
      const cartItems = state.cart.cartItems.filter(
        (item) => item._id !== action.payload._id
      );

      Cookies.set('cookie-cartItems', JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    }

    case 'SAVE_SHIPPING_ADDRESS': {
      Cookies.set('cookie-shipping', JSON.stringify(action.payload));
      return {
        ...state,
        cart: { ...state.cart, shippingAddress: action.payload },
      };
    }
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
