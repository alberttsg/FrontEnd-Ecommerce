import { createContext, useReducer } from "react";
import UserReducer from "./UserReducer";
import axios from "axios";

const token = JSON.parse(localStorage.getItem("token"));

const initialState = {
  token: token ? token : null,
  user: {},
  users: []
};

export const UserContext = createContext(initialState);

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(UserReducer, initialState);

  const login = async (user) => {
    const res = await axios.post('https://backend-ecommerce-production-ce12.up.railway.app/login', user);
    dispatch({
      type: "LOGIN-REGISTER",
      payload: res.data.token,
    });
    if (res.data) {
      localStorage.setItem("token", JSON.stringify(res.data.token));
    }
  };

  const register = async (user) => {
    const res = await axios.post('https://backend-ecommerce-production-ce12.up.railway.app/register', user);
    dispatch({
      type: 'LOGIN-REGISTER',
      payload: res.data.token,
    });
    if (res.data) {
      localStorage.setItem("token", JSON.stringify(res.data.token));
    }
  }

  const getUsers = async () => {
    const token = JSON.parse(localStorage.getItem('token'));
    const res = await axios.get('https://backend-ecommerce-production-ce12.up.railway.app/users/all', {
      headers: {
        Authorization: token
      }
    });
    dispatch({
      type: 'GET_USERS',
      payload: res.data,
    });
    return res;
  }

  const getUserInfo = async () => {
    const token = JSON.parse(localStorage.getItem('token'));
    if (!token) return null;
    try {
      const res = await axios.get(`https://backend-ecommerce-production-ce12.up.railway.app/users/id/`, {
        headers: { Authorization: token }
      });
      dispatch({
        type: 'USER_INFO',
        payload: res.data,
      });
      return res.data;
    } catch (error) {
      console.log(error.response.data);
    }
  }

  const getUserById = async (id) => {
    const token = JSON.parse(localStorage.getItem('token'));
    const res = await axios.get(`https://backend-ecommerce-production-ce12.up.railway.app/users/id/${id}`, {
      headers: {
        Authorization: token
      }
    });
    dispatch({
      type: 'GET_USER_BY_ID',
      payload: res.data,
    });
    return res;
  }

  const editUser = async (user, id) => {
    const token = JSON.parse(localStorage.getItem('token'));
    const res = await axios.put(`https://backend-ecommerce-production-ce12.up.railway.app/users/id/${id}`, user, {
      headers: {
        Authorization: token
      }
    });
    dispatch({
      type: 'EDIT_USER',
      payload: res.data,
    });
    getUsers();
    return res;
  }

  const deleteUser = async (id) => {
    const token = JSON.parse(localStorage.getItem('token'));
    const res = await axios.delete(`https://backend-ecommerce-production-ce12.up.railway.app/users/id/${id}`, {
      headers: {
        Authorization: token
      }
    });
    dispatch({
      type: 'DELETE_USER',
      payload: res.data,
    });
    getUsers();
    return console.log(res);
  }
  return (
    <UserContext.Provider
      value={{
        token: state.token,
        user: state.user,
        login,
        register,
        getUsers,
        users: state.users,
        getUserInfo,
        userInfo: state.userInfo,
        getUserById,
        editUser,
        deleteUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
