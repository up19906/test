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
    concept_budget: "",
    concept_leader: "",
    concept_phone: "",
    concept_proposal_name: "",
    concept_proposal_paln_master: "เลือกประเภท",
    concept_proposal_paln_sub: "เลือกแหล่งทุน",
    concept_proposal_type: "",
    concept_univercity_budget: "",
    concept_year: "เลือกปี",
    id: 0,
    user_idcard: "",
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
    case GET_YEAR:
      return { ...state, year: payload };

    case GET_PROJECT_TYPE:
      return { ...state, projecttype: payload };

    case GET_USER:
      return { ...state, user: payload };

    case GET_SOURCEFUND:
      return { ...state, sourcefund: payload };

    case ADD_CONCEPT:
      return {
        ...state,
        concept: {
          ...state.concept,
          concept_budget: payload.concept_budget,
          concept_leader: payload.concept_leader,
          concept_phone: payload.concept_phone,
          concept_proposal_name: payload.concept_proposal_name,
          concept_proposal_paln_master: payload.concept_proposal_paln_master,
          concept_proposal_paln_sub: payload.concept_proposal_paln_sub,
          concept_proposal_type: payload.concept_proposal_type,
          concept_univercity_budget: payload.concept_univercity_budget,
          concept_year: payload.concept_year,
          id: payload.id,
          user_idcard: payload.user_idcard,
        },
      };

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
