import { combineReducers } from "redux";
import categoriesReducer from "./categoriesReducer";
import tasksReducer from "./taskReducer";

import userReducer from "./userReducer";
const rootReducer = combineReducers({
  user: userReducer,
  category: categoriesReducer,
  tasks: tasksReducer,
});
export default rootReducer;
