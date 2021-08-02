import { ADD_COORDINATOR_FUNDING } from "../types";

const initialState = {
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
    case ADD_COORDINATOR_FUNDING:
      return { ...state, usergroup: payload };

    // case UPDATE_TUTORIAL:
    //   return state.map((tutorial) => {
    //     if (tutorial.id === payload.id) {
    //       return {
    //         ...tutorial,
    //         ...payload,
    //       };
    //     } else {
    //       return tutorial;
    //     }
    //   });

    // case DELETE_TUTORIAL:
    //   return state.filter(({ id }) => id !== payload.id);

    // case DELETE_ALL_TUTORIALS:
    //   return [];

    default:
      return state;
  }
}
