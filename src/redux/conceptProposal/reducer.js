import { ADD_CONCEPT, ADD_STUDYAREA, ADD_NETWORK } from "../types";

const initialState = {
  concept: [],
  studyarea: [],
  network: [],
};

export default function reducerconcept(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ADD_CONCEPT:
      return { ...state, concept: payload };
    case ADD_STUDYAREA:
      return { ...state, studyarea: payload };
    case ADD_NETWORK:
      return { ...state, network: payload };

    // case RETRIEVE_TUTORIALS:
    //   return payload;

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
