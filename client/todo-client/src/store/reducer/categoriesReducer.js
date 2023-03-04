const initialState = { categories: [] };

function categoriesReducer(state = initialState, action) {
  switch (action.type) {
    case "fetchCategories/success":
      return {
        ...state,
        categories: action.payload,
      };
    case "addCategory/success":
      return {
        ...state,
        categories: state.categories.concat(action.payload),
      };
    default:
      return state;
  }
}

export default categoriesReducer;
