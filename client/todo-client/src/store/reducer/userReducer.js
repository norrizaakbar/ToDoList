const initialState = { user: {} };

function userReducer(state = initialState, action) {
  switch (action.type) {
    case "register/success":
      return {
        ...state,
        user: action.payload,
      };

    default:
      return state;
  }
}

export default userReducer;
