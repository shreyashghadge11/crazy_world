import React, { useReducer, createContext } from "react";
import Authreducer from "../resolvers/authresolver";
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

// const isEmpty = require("is-empty");

const initialState = {
  isAuthenticated: false,
  user: {},
  userLoading: false,
  autherrors: {},
  // signup: false,
};

export const AuthContext = createContext(initialState);

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Authreducer, initialState);

  function registerUser(userData) {
    // dispatch(toggleUserLoading());
    axios
      .post("/api/users/signup", userData)
      .then((res) => {
        // dispatch(toggleUserLoading());
        localStorage.setItem(
          "login message",
          "Registered successfully.Login to continue"
        );
        // dispatch();
        dispatch(setErrors());
      })
      .catch((err) => {
        dispatch(setErrors(err.response.data));
        // dispatch(toggleUserLoading());
      });
  }

  function loginUser(userData) {
    // dispatch(toggleUserLoading());
    axios
      .post("/api/users/login", userData)
      .then((res) => {
        // dispatch(resetPost());
        const { token } = res.data;
        localStorage.setItem("jwtToken", token);
        setAuthToken(token);
        const decoded = jwt_decode(token);
        dispatch(setCurrentUser(decoded));
        dispatch(setErrors());
      })
      .catch((err) => {
        dispatch(setErrors(err.response.data));
        // dispatch(setTimeout(setErrors(), 2000));
      });
  }

  function logoutUser() {
    localStorage.removeItem("jwtToken");
    setAuthToken(false);
    dispatch(setCurrentUser({}));
  }

  // function logUser(data) {
  //   return {
  //     type: "SET_CURRENT_USER",
  //     payload: data,
  //   };
  // }

  function setCurrentUser(userData) {
    return {
      type: "SET_CURRENT_USER",
      payload: userData,
    };
  }

  function setErrors(error) {
    return {
      type: "SET_ERRORS",
      payload: error,
    };
  }

  return (
    <AuthContext.Provider
      value={{
        authstate: state,
        registerUser,
        loginUser,
        logoutUser,
        setErrors,
        autherrors: state.autherrors,
        // logUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// function toggleUserLoading()  {
//   return {
//     type: TOGGLE_USER_LOADING,
//   };
// }
