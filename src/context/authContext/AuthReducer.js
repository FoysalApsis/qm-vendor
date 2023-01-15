import { SET_LOGIN, UNSET_LOGIN } from "../ActionTypes";
const AuthReducer = (state, action) => {
  switch (action.type) {
    case SET_LOGIN:
      return {
        ...state,
        isLogin: true,
        user: action.payload,
      };
    case UNSET_LOGIN:
      localStorage.removeItem("token");
      localStorage.removeItem("userObj");
      return {
        ...state,
        isLogin: false,
        token: null,
        user: null,
      };

    default:
      return state;
  }
};

export default AuthReducer;
