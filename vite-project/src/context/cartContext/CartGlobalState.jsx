import axios from 'axios'
import { createContext, useContext, useReducer } from 'react';
import { CartReducer } from './CartReducer';
import { UserContext } from '../UserContext/UserState';

export const CartGlobalContext = createContext();

const initialState = {
  cart: [],
  cartTotal: 0
}

export const CartGlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(CartReducer, initialState);
  const { token } = useContext(UserContext);

  const getCart = async () => {
    try {
      const res = await axios.get('https://backend-ecommerce-production-ce12.up.railway.app/carts/',
      {
        headers: {
          'Authorization': token
        }
      });
      dispatch({
        type: 'GET_CART',
        payload: res.data,
      });
    } catch (e) {
      console.log(e.response.data);
    }
  };

  const addCart = async (product,quant) => {
    try {
      const res = await axios.put('https://backend-ecommerce-production-ce12.up.railway.app/carts/', {
        "products": [
          {
            "product": product,
            "quantity": quant
          }
        ]
      }, {
        headers: {
          'Authorization': token
        }
      });
      dispatch({
        type: 'ADD_CART',
        payload: res.data,
      });
    } catch (e) {
      console.log(e.response.data);
    }
  };

  const clearCart = async () => {
    try{
      const res = await axios.post('https://backend-ecommerce-production-ce12.up.railway.app/tickets/clearcart',
      {

      },
      {
        headers: {
          'Authorization': token
        }
      });
      console.log(res);
      dispatch({
        type:'CLEAR_CART',
      });
      
    }catch(e){
      console.log(e.response.data);
    }
  }

  return (
    <CartGlobalContext.Provider
      value={{
        cart: state.cart,
        cartTotal: state.cartTotal,
        getCart,
        addCart,
        clearCart,
      }}>
      {children}
    </CartGlobalContext.Provider>
  )
}
