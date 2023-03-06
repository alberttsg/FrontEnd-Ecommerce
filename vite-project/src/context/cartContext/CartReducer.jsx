export const CartReducer = (state,action) => {
  switch (action.type) {
    case 'GET_CART':
      return{
        ...state,
        cart: action.payload.items,
        cartTotal: Math.round((action.payload.total + Number.EPSILON) * 100) / 100,
      };
    case 'ADD_CART':
      return{
        ...state,
        cart: action.payload.items,
        cartTotal: Math.round((action.payload.total + Number.EPSILON) * 100) / 100,
      };
    case 'CLEAR_CART':
      return{
        ...state,
        cart: '',
      };
    default:
      return state;
  };
  
};
