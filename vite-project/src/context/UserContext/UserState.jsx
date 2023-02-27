import { createContext, useReducer } from "react";
import UserReducer from "./UserReducer";
import axios from "axios";

const token = JSON.parse(localStorage.getItem("token"));

const initialState = {
  token: token ? token : null,
  user: null,
};

export const UserContext = createContext(initialState);

export const UserProvider = ({ children }) => {
  const [state, dispatch ] = useReducer(UserReducer, initialState);


  const login = async (user) => {
    const res = await axios.post('https://backend-ecommerce-production-ce12.up.railway.app/login', user);
    dispatch({
      type: "LOGIN-REGISTER",
      payload: res.data,
    });
    if (res.data) {
      localStorage.setItem("token", JSON.stringify(res.data.token));
      console.log(res.data)
    }
  };
  
  const register = async (user) =>{
    const res = await axios.post ('https://backend-ecommerce-production-ce12.up.railway.app/register', user);
    dispatch({
      type: 'LOGIN-REGISTER',
      payload: res.data,
    });
    if (res.data) {
      localStorage.setItem("token", JSON.stringify(res.data.token));
      console.log(res.data)
    }
  }

  return (
    <UserContext.Provider
      value={{
        token: state.token,
        user: state.user,
        login,
        register,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
