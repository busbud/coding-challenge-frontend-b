import { combineReducers } from "redux";
import searchReducers from "../components/search/slice";

export default combineReducers({
  search: searchReducers
});
