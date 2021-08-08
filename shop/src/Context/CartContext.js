import { createContext, useReducer, useCallback } from "react";
import { reducer, init } from "../Reducer/Reducer.js";
import { data } from "../data";
export const CartContext = createContext();

export const CartProvider = (props) => {
  const meme = useCallback(reducer, [data]);
  const [state, dispatch] = useReducer(meme, init);

  return <CartContext.Provider value={{ state, dispatch, init }}>{props.children}</CartContext.Provider>;
};
