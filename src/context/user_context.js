import React, { useContext, useReducer, useState } from 'react';
import { products_url as url } from '../utils/constants'
import {
  LOGIN_REQUEST,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  REGISTER_USER_FAIL,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  LOAD_USER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  NEW_PASSWORD_REQUEST,
  NEW_PASSWORD_SUCCESS,
  NEW_PASSWORD_FAIL,
  CLEAR_ERRORS
} from '../actions';
import { axiosInstance } from '../config';
import { useCookies } from 'react-cookie';
import reducer from '../reducers/user_reducer'
import axios from 'axios';

const UserContext = React.createContext();

const initialState= {
  isAuthenticated: false,
  error: null,
  loading: false,
  message: '',
  success: false
}
export const UserProvider = ({ children }) => {
  const [cookies, setCookie] = useCookies(['myCookie']);
  const [state, dispatch] = useReducer(reducer, initialState);



  // Login
  const login =  async (email, password,remember) => {
    try {
      dispatch({ type: LOGIN_REQUEST, payload:{email,password,remember}});

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      console.log({email,password,remember})
      const { data } = await axios.post(
        "http://localhost:5000/api/users/login",
        { email, password },
        config
      );

      const expirationDate = new Date();
      const rememberUser = expirationDate.setFullYear(expirationDate.getFullYear() + 10);
      const forgetUser = expirationDate.setDate(expirationDate.getDate() + 1);

      if (remember) {
        setCookie('currentUser', data.user, { path: '/',expires: rememberUser});
      } else {
        setCookie('currentUser', { path: '/' ,expires: forgetUser});
      };

      dispatch({
        type: LOGIN_SUCCESS,
        payload: data.user,
      });
    } catch (error) {
      dispatch({
        type: LOGIN_FAIL,
        payload: error.response.data.message,
      });
    }
  };

  // Load user
  const loadUser = () => async () => {
    try {
      dispatch({ type: LOAD_USER_REQUEST });

      const { data } = await axiosInstance.get("/api/users/me");

      dispatch({
        type: LOAD_USER_SUCCESS,
        payload: data.user,
      });
    } catch (error) {
      dispatch({
        type: LOAD_USER_FAIL,
        payload: error.response.data.message,
      });
    }
  };


  // Register user
  const register = async(userData) => {
    try {
      dispatch({ type: REGISTER_USER_REQUEST });
      console.log("done")
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      
      console.log(userData)
      console.log('start')

    const { data } = await axios.post(
      "http://localhost:5000/api/users/signup",
      userData,
    );

    console.log(data)
    dispatch({
        type: REGISTER_USER_SUCCESS,
        payload: data.user,
    });
  } catch (error) {
      dispatch({
          type: REGISTER_USER_FAIL,
          payload: error.response.data.message,
      });
  }
  };


  // Update password
  const updatePassword = async(passwords)=> {
    try {
      dispatch({ type: UPDATE_PASSWORD_REQUEST });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axiosInstance.put(
        "/api/users/password/update",
        passwords,
        config
      );

      dispatch({
        type: UPDATE_PASSWORD_SUCCESS,
        payload: data.success,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_PASSWORD_FAIL,
        payload: error.response.data.message,
      });
    }
  };


  // Logout user
  const logout = () => async () => {
    try {
      await axiosInstance.get("/api/users/logout");
      dispatch({
        type: LOGOUT_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: LOGOUT_FAIL,
        payload: error.response.data.message,
      });
    }
  };


  // Forgot password
  const forgotPassword = (email) => async () => {
    try {
      dispatch({ type: FORGOT_PASSWORD_REQUEST });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axiosInstance.post(
        "/api/users/password/forgot",
        email,
        config
      );

      dispatch({
        type: FORGOT_PASSWORD_SUCCESS,
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: FORGOT_PASSWORD_FAIL,
        payload: error.response.data.message,
      });
    }
  };


  // Reset password
  const resetPassword = (token, passwords) => async () => {
    try {
      dispatch({ type: NEW_PASSWORD_REQUEST });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axiosInstance.put(
        `/api/users/password/reset/${token}`,
        passwords,
        config
      );

      dispatch({
        type: NEW_PASSWORD_SUCCESS,
        payload: data.success,
      });
    } catch (error) {
      dispatch({
        type: NEW_PASSWORD_FAIL,
        payload: error.response.data.message,
      });
    }
  };

  return (
    <UserContext.Provider
      value={{
        ...state,
        login,
        loadUser,
        register,
        updatePassword,
        logout,
        forgotPassword,
        resetPassword,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUsersContext = () => {
  return useContext(UserContext);
};
