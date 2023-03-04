const initialState = { tasks: [] };

function tasksReducer(state = initialState, action) {
  switch (action.type) {
    case "fetchTasks/success":
      return {
        ...state,
        tasks: action.payload,
      };
    case "addTask/success":
      return {
        ...state,
        tasks: state.tasks.concat(action.payload),
      };
    default:
      return state;
  }
}

export default tasksReducer;
