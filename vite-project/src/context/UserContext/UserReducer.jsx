const users = (state, action) => {
  switch (action.type) {
    case "LOGIN-REGISTER":
      return {
        ...state,
        token: action.payload.token,
      };
    case "GET_USERS":
      return {
        ...state,
        users: action.payload,
      };
    case "USER_INFO":
      return {
        ...state,
        userInfo: action.payload,
      };
    case "GET_USER_BY_ID":
      return {
        ...state,
        user: action.payload,
      };
    case "EDIT_USER":
      return {
        ...state,

        users: state.users.map((user) => {
          if (user._id === action.payload._id) {
            user = action.payload;
          }

          return user;
        }),
      };
    case "DELETE_USER":
      return {
        ...state,
        users: state.users.filter(user => user._id != action.payload._id)
      };
    default:
      return state;
  }
};
export default users;
