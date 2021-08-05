import { combineReducers } from "redux";
import statehome from "./home/reducer";
import header from "./header/reducer";
import concept from "./conceptProposal/reducer";
import addconcept from "./addconcept/reducer";

export default combineReducers({
  statehome,
  header,
  concept,
  addconcept,
});
