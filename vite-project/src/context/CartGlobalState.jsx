import axios from 'axios'
import { createContext, useReducer } from 'react';
import { AppReducer } from './AppReducer';

export const CartGlobalContext = createContext();

const initialState = {
  cart:[]
} 

export const CartGlobalProvider = ({children}) =>{
  const [state,dispatch] = useReducer(AppReducer,initialState);

  const  getCart = async () => {
    try{
      const res = await axios.put('https://backend-ecommerce-production-ce12.up.railway.app/carts/',{
          "products":[
            {
              "product":"63f7d56805a64fa5c5eaa616",
              "quantity": 2
            }
          ]
      })
      console.log(res);
    }catch(e){
      console.log(e);
    }
    dispatch({
      type: 'GET_CART',
      payload: res,
    });
  };
  return(
    <CartGlobalContext.Provider 
      value={{
        cart: state.cart,
        getCart,
      }}>
      {children}
    </CartGlobalContext.Provider>
  )
}
 