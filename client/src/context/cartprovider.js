import React, { useReducer, createContext } from "react";
import Cartreducer from "../resolvers/cartresolver";
import axios from "axios";

const initialState = {
  mycart: [],
  myorders: [],
  guestcart: [],
  carterrors: undefined,
};

export const CartContext = createContext(initialState);

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Cartreducer, initialState);

  function addproducttocart(data) {
    // console.log(data);
    axios
      .post("/api/orders/cart", data)
      .then((result) => {
        // console.log(result);
        dispatch({
          type: "ADD_TO_CART",
          payload: result.data,
        });
      })
      .catch((err) => {
        dispatch(setcartErrors(err.response.data));
      });
  }

  function removefromcart(data) {
    axios
      .post("/api/orders/cartremove", data)
      .then((result) => {
        // console.log(result);
        dispatch({
          type: "REMOVE_FROM_CART",
          payload: { result: result.data, id: data.itemid },
        });
      })
      .catch((err) => {
        dispatch(setcartErrors(err));
      });
  }

  function getmycart(data) {
    axios
      .post("/api/orders/mycart/get", data)
      .then((result) => {
        // console.log(result.data);
        dispatch({
          type: "GET_MYCART",
          payload: result.data,
        });
      })
      .catch((err) => {
        dispatch(setcartErrors(err));
      });
  }

  function placeorder(data) {
    axios
      .post("/api/orders/placeorder", data)
      .then((result) => {
        // console.log(result);
        dispatch({
          type: "PLACE_ORDER",
          payload: result,
        });
      })
      .catch((err) => {
        dispatch(setcartErrors(err.response.data));
      });
  }

  function myorders(email) {
    axios
      .get(`/api/orders/myorder/${email}`)
      .then((result) => {
        dispatch({
          type: "MY_ORDERS",
          payload: result.data,
        });
      })
      .catch((err) => {
        dispatch(setcartErrors(err.response.data));
      });
  }

  function setcartErrors(error) {
    return {
      type: "SET_ERRORS",
      payload: error,
    };
  }
  function guestproducttocart(data) {
    // console.log(data);
    axios
      .post("/api/guest/cart", data)
      .then((result) => {
        // console.log(result);
        dispatch({
          type: "GUEST_TO_CART",
          payload: result.data,
        });
      })
      .catch((err) => {
        dispatch(setcartErrors(err.response.data));
      });
  }

  function getguestcart(userid) {
    axios
      .get(`/api/guest/guest/${userid}`)
      .then((result) => {
        // console.log(result);
        dispatch({
          type: "GET_GUEST_CART",
          payload: result.data,
        });
      })
      .catch((err) => {
        dispatch(setcartErrors(err.response.data));
      });
  }
  return (
    <CartContext.Provider
      value={{
        cartstate: state,
        addproducttocart,
        removefromcart,
        getmycart,
        placeorder,
        myorders,
        guestproducttocart,
        getguestcart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// function toggleUserLoading()  {
//   return {
//     type: TOGGLE_USER_LOADING,
//   };
// }
