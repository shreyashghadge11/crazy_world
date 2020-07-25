import React, { useReducer, createContext } from "react";
import Productreducer from "../resolvers/productresolver";
import axios from "axios";

const initialState = {
  allproducts: [],
  product: {},
  categoryproducts: [],
  producterrors: undefined,
};

export const ProductContext = createContext(initialState);

export const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Productreducer, initialState);

  function getallproducts() {
    axios
      .get("/api/products/all")
      .then((result) => {
        // console.log(result.data);
        dispatch({
          type: "SET_PRODUCT_LIST",
          payload: result.data,
        });
      })
      .catch((err) => {
        dispatch(setproductErrors(err));
      });
  }

  function getproduct(id) {
    axios
      .get(`/api/products/${id}`)
      .then((result) => {
        dispatch({
          type: "SET_PRODUCT",
          payload: result,
        });
      })
      .catch((err) => {
        dispatch(setproductErrors(err.response.data));
      });
  }

  function getcategotyproducts(item) {
    axios
      .get(`/api/products/${item}`)
      .then((result) => {
        dispatch({
          type: "SET_CAT_PRODUCT",
          payload: result,
        });
      })
      .catch((err) => {
        dispatch(setproductErrors(err.response.data));
      });
  }

  function setproductErrors(error) {
    return {
      type: "SET_ERRORS",
      payload: error,
    };
  }

  return (
    <ProductContext.Provider
      value={{
        productstate: state,
        getallproducts,
        getproduct,
        getcategotyproducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

// function toggleUserLoading()  {
//   return {
//     type: TOGGLE_USER_LOADING,
//   };
// }
