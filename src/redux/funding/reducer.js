import {
  INSERT_COORDINATOR_FUNDING,
  GETONE_COORDINATOR_FUNDING,
  UPDATE_COORDINATOR_FUNDING,
  INSERT_SOURCEFUND,
  GET_RESEARCH_FACULTY,
  GET_BUDGET_TYPE,
  GET_FUNDING_STATUS,
  CLEAR_COORDINATOR_FUNDING,
} from "../types";

const initialState = {
  insertfunding: [],
  researchfaculty: [],
  budgettype: [],
  fundingstatus: [],
  insertsourcefund: [],
  funding_budget: 0,
  funding_academic_budget: 0,
  count_funding: [],
  count_funding_academic: [],
  coordinator_funding: [],
  coordinator_funding_academic: [],
  getonefunding: [],
  updatefunding: [],
};

export default function reducerhome(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_FUNDING_STATUS:
      return { ...state, fundingstatus: payload };

    case GET_RESEARCH_FACULTY:
      return { ...state, researchfaculty: payload };

    case GET_BUDGET_TYPE:
      return { ...state, budgettype: payload };

    case INSERT_COORDINATOR_FUNDING:
      return { ...state, insertfunding: payload };

    case INSERT_SOURCEFUND:
      return { ...state, insertsourcefund: payload };

    //Update Funding
    case GETONE_COORDINATOR_FUNDING:
      return { ...state, getonefunding: payload };
    case UPDATE_COORDINATOR_FUNDING:
      return { ...state, updatefunding: payload };
    //End Update Funding

    case CLEAR_COORDINATOR_FUNDING:
      return { ...state, insertfunding: payload };

    default:
      return state;
  }
}
