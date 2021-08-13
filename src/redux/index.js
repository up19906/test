import { combineReducers } from "redux";
import statehome from "./home/reducer";
import header from "./header/reducer";
import concept from "./conceptProposal/reducer";
import funding from "./funding/reducer";

export default combineReducers({
  statehome,
  header,
  concept,
  funding,
});
