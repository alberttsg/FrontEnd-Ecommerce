export const CartReducer = (state,action) => {
  switch (action.type) {
    case 'GET_CART':
      return{
        ...state,
        cart: action.payload
      };
    default:
      return state;
  }
};
