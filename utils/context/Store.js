import Cookies from 'js-cookie';
import { createContext, useReducer } from 'react';

export const Store = createContext();

const initialState = {
  darkMode: Cookies.get('cookie-theme') === 'ON' ? true : false,
};

function reducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_DARK_MODE_ON':
      return { ...state, darkMode: !state.darkMode };
    case 'TOGGLE_DARK_MODE_OFF':
      return { ...state, darkMode: !state.darkMode };

    default:
      return state;
  }
}

export function StoreProvide(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };

  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
