import {
  GET_USERGROUP,
  GET_USER_LOGIN,
  REMOVE_USER_LOGIN,
  GET_CONCEPT_PROPOSAL,
  GET_BUDGET_FUNDING,
  GET_BUDGET_FUNDING_ACADEMIC,
  GET_COUNT_FUNDING,
  GET_COUNT_FUNDING_ACADEMIC,
  GET_COORDINATOR_FUNDING,
  GET_COORDINATOR_FUNDING_ACADEMIC,
  CREATE_TUTORIAL,
  RETRIEVE_TUTORIALS,
  UPDATE_TUTORIAL,
  DELETE_TUTORIAL,
  DELETE_ALL_TUTORIALS,
} from "../types";

const initialState = {
  userlogin: [],
  usergroup: [],
  conceptproposal: [],
  funding_budget: 0,
  funding_academic_budget: 0,
  count_funding: [],
  count_funding_academic: [],
  coordinator_funding: [],
  coordinator_funding_academic: [],
};

export default function reducerhome(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_USERGROUP:
      return { ...state, usergroup: payload };

    case GET_USER_LOGIN:
      return { ...state, userlogin: payload }; 
      
      case REMOVE_USER_LOGIN:
      return { ...state, userlogin: payload };

    case GET_CONCEPT_PROPOSAL:
      return { ...state, conceptproposal: payload };

    case GET_BUDGET_FUNDING:
      return { ...state, funding_budget: payload.sum };

    case GET_BUDGET_FUNDING_ACADEMIC:
      return { ...state, funding_academic_budget: payload.sum };

    case GET_COUNT_FUNDING:
      return { ...state, count_funding: payload };

    case GET_COUNT_FUNDING_ACADEMIC:
      return { ...state, count_funding_academic: payload };

    case GET_COORDINATOR_FUNDING:
      return { ...state, coordinator_funding: payload };

    case GET_COORDINATOR_FUNDING_ACADEMIC:
      return { ...state, coordinator_funding_academic: payload };

    case CREATE_TUTORIAL:
      return [...state, payload];

    case RETRIEVE_TUTORIALS:
      return payload;

    case UPDATE_TUTORIAL:
      return state.map((tutorial) => {
        if (tutorial.id === payload.id) {
          return {
            ...tutorial,
            ...payload,
          };
        } else {
          return tutorial;
        }
      });

    case DELETE_TUTORIAL:
      return state.filter(({ id }) => id !== payload.id);

    case DELETE_ALL_TUTORIALS:
      return [];

    default:
      return state;
  }
}
