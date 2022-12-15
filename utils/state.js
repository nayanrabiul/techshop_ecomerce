import React from "react";
import { createStore } from "react-hooks-global-state";

const initialState = { cartItems: [], shippingAddress: [] };

const reducer = (state, action) => {
  switch (action.type) {
    case "initialize": {
      return action.initialize;
    }
    case "onAdd": {
      const product = action.payload;
      const exist = state.cartItems.find((x) => x.id === product.id);
      if (exist) {
        const newCartItems = state.cartItems.map((x) =>
          x.id === product.id ? { ...exist, qty: exist.qty + 1 } : x
        );
        const newState = { cartItems: newCartItems };
        localStorage.setItem("cartItems", JSON.stringify(newState));
        return newState;
      } else {
        const newCartItems = [...state.cartItems, { ...product, qty: 1 }];
        const newState = { cartItems: newCartItems };
        localStorage.setItem("cartItems", JSON.stringify(newState));
        return newState;
      }
    }

    case "onRemove": {
      const product = action.payload;
      const exist = state.cartItems.find((x) => x.id === product.id);
      if (exist.qty > 1) {
        const newCartItems = state.cartItems.map((x) =>
          x.id === product.id ? { ...exist, qty: exist.qty - 1 } : x
        );
        const newState = { cartItems: newCartItems };
        localStorage.setItem("cartItems", JSON.stringify(newState));
        return newState;
      }
    }
    case "addShippingAddress": {
      const sA = action.payload;

      const newState = { ...state, shippingAddress: [sA] };
      localStorage.setItem("cartItems", JSON.stringify(newState));

      return newState;
    }

    default:
      return state;
  }
};

const { dispatch, useStoreState } = createStore(reducer, initialState);
const state = { dispatch, useStoreState };
export default state;
