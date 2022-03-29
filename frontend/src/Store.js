import React, { useContext } from "react";
import { useReducer } from "react";

//step 1

export const StoreContext = React.createContext();

const initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
  },
};

function reducer(state, action) {
  switch (action.type) {
    case "CART_ADD_ITEM":
      const newItem = action.payload;
      const existingItem = state.cart.cartItems.find(
        (item) => item._id === newItem._id
      );

      const cartItems = existingItem
        ? state.cart.cartItems.map((item) =>
            item._id === existingItem._id ? newItem : item
          )
        : [...state.cart.cartItems, newItem];

      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      return {
        ...state,
        cart: {
          ...state.cart,
          cartItems,
        },
      };

    case "REMOVE_ITEM":
      const tempCartItems = state.cart.cartItems.filter(
        (item) => item._id !== action.payload
      );

      localStorage.setItem("cartItems", JSON.stringify(tempCartItems));

      return {
        ...state,
        cart: {
          ...state.cart,
          cartItems: tempCartItems,
        },
      };

    default:
      return state;
  }
}

//wishList reducers

//wistlist

const initialState2 = {
  wishlist: {
    wishlistItems: localStorage.getItem("wishlistItems")
      ? JSON.parse(localStorage.getItem("wishlistItems"))
      : [],
  },
};

function reducer2(state, action) {
  switch (action.type) {
    case "WISHLIST_ADD_ITEM":
      const newItem = action.payload;
      const existingItem = state.wishlist.wishlistItems.find(
        (item) => item._id === newItem._id
      );

      const wishlistItems = existingItem
        ? state.wishlist.wishlistItems.map((item) =>
            item._id === existingItem._id ? newItem : item
          )
        : [...state.wishlist.wishlistItems, newItem];

      console.log(wishlistItems);

      localStorage.setItem("wishlistItems", JSON.stringify(wishlistItems));
      return {
        ...state,
        wishlist: {
          ...state.wishlistItems,
          wishlistItems,
        },
      };

    case "WISHLIST_REMOVE_ITEM":
      const tempCartItems = state.wishlist.wishlistItems.filter(
        (item) => item._id !== action.payload
      );

      localStorage.setItem("wishlistItems", JSON.stringify(tempCartItems));

      return {
        ...state,
        wishlist: {
          ...state.wishlist,
          wishlistItems: tempCartItems,
        },
      };

    default:
      return state;
  }
}

//auth Reducers////////////////
let userInitialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : [],
  loading: false,
  error: "",
};
function reducer3(state, action) {
  switch (action.type) {
    case "LOGIN_BEGIN":
      // localStorage.setItem("userInfo", JSON.stringify(userInfo));
      return {
        ...state,
        loading: true,
        error: "",
      };

    case "LOGIN_SUCCESS":
      let userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
      return {
        ...state,
        loading: false,
        error: "",
        userInfo: userInfo,
      };

    case "LOGIN_FAIL":
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
}

//shipping Reducers////////////////
let shippingIntialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : [],
  loading: false,
  error: "",
};
function reducer4(state, action) {
  switch (action.type) {
    case "LOGIN_BEGIN":
      // localStorage.setItem("userInfo", JSON.stringify(userInfo));
      return {
        ...state,
        loading: true,
        error: "",
      };

    case "LOGIN_SUCCESS":
      let userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
      return {
        ...state,
        loading: false,
        error: "",
        userInfo: userInfo,
      };

    case "LOGIN_FAIL":
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
}

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [state2, dispatch2] = useReducer(reducer2, initialState2);
  const [state3, dispatch3] = useReducer(reducer3, userInitialState);
  const [state4, dispatch4] = useReducer(reducer3, shippingIntialState);
  let value = { state, dispatch, state2, dispatch2, state3, dispatch3 };
  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};

export function useStore() {
  return useContext(StoreContext);
}
