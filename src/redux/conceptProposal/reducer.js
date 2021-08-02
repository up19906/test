import {
  ADD_CONCEPT,
  ADD_STUDYAREA,
  ADD_NETWORK,
  GET_USER,
  GET_SOURCEFUND,
  GET_PROJECT_TYPE,
  GET_YEAR,
} from "../types";

const initialState = {
  concept: {
    selectProjectType: "",
    project_name: "",
    selectSourceFunds: "",
    project_budget: 0,
    project_star: "",
    project_agency: "",
    project_status: "",
  },
  test: {},
  test2: {},
  studyarea: [],
  network: [],
  user: [],
  sourcefund: [],
  projecttype: [],
  year: [],
};

export default function reducerconcept(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case "UPDATE_INPUT":
      return { ...state, test: payload };

    case "UPDATE_INPUT2":
      return { ...state, test2: payload };

    case GET_YEAR:
      return { ...state, year: payload };

    case GET_PROJECT_TYPE:
      return { ...state, projecttype: payload };

    case GET_USER:
      return { ...state, user: payload };

    case GET_SOURCEFUND:
      return { ...state, sourcefund: payload };

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
