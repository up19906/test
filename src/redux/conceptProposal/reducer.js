import {
  ADD_CONCEPT,
  ID_CONCEPT_PROPOSAL,
  INSERT_CONCEPT,
  ADD_SUB_CONCEPT,
  ADD_STUDYAREA,
  ADD_NETWORK,
  CLEAR_CONCEPT,
  GET_USER,
  GET_SOURCEFUND,
  GET_PROJECT_TYPE,
  GET_YEAR,
  GET_CO_RESEARCH_GROUP,
  INSERT_STUDYAREA,
  INSERT_NETWORK,
} from "../types";

const initialState = {
  concept: [],
  idconcept: [],
  subconcept: [],
  insertconcept: [],
  studyarea: [],
  insertstudyarea: [],
  network: [],
  insertnetwork: [],
  co_research_group: [],
  user: [],
  sourcefund: [],
  projecttype: [],
  year: [],
};

export default function reducerconcept(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_YEAR:
      return { ...state, year: payload };

    case GET_PROJECT_TYPE:
      return { ...state, projecttype: payload };

    case GET_CO_RESEARCH_GROUP:
      return { ...state, co_research_group: payload };

    case GET_USER:
      return { ...state, user: payload };

    case GET_SOURCEFUND:
      return { ...state, sourcefund: payload };

    case ADD_CONCEPT:
      return { ...state, concept: payload };

    case ID_CONCEPT_PROPOSAL:
      return { ...state, idconcept: payload };

    case INSERT_CONCEPT:
      return { ...state, insertconcept: payload };

    case ADD_SUB_CONCEPT:
      return { ...state, subconcept: [...state.subconcept, payload] };

    case ADD_STUDYAREA:
      return { ...state, studyarea: payload };

    case INSERT_STUDYAREA:
      return { ...state, insertstudyarea: payload };

    case ADD_NETWORK:
      return { ...state, network: payload };

    case INSERT_NETWORK:
      return { ...state, insertnetwork: payload };

    case CLEAR_CONCEPT:
      return {
        ...state,
        concept: payload,
        subconcept: payload,
        studyarea: payload,
        network: payload,
        insertconcept: payload,
      };

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
