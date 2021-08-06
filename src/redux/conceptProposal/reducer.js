import {
  ADD_CONCEPT,
  ADD_ID_SUBCONCEPT,
  ADD_SUB_CONCEPT,
  ADD_STUDYAREA,
  ADD_NETWORK,
  GET_USER,
  GET_SOURCEFUND,
  GET_PROJECT_TYPE,
  GET_YEAR,
} from "../types";

const initialState = {
  concept: {
    project_type_id: null,
    concept_proposal_name: "",
    source_funds_id: null,
    concept_year: "เลือกปี",
    concept_budget: "",
    concept_univercity_budget: "",
    concept_leader: "",
    leader_name: "",
    concept_phone: "",
    concept_proposal_type: null,
    id: 0,
    // user_idcard: "",
  },
  subconcept: {
    project_type_id: null,
    concept_proposal_name: "",
    source_funds_id: null,
    concept_year: "เลือกปี",
    concept_budget: "",
    concept_univercity_budget: "",
    concept_leader: "",
    leader_name: "",
    concept_phone: "",
    concept_proposal_type: null,
    id: 0,
    // user_idcard: "",
  },
  idsubconcept: {},
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

    case ADD_ID_SUBCONCEPT:
      return { ...state, idsubconcept: payload };

    case ADD_CONCEPT:
      return {
        ...state,
        concept: {
          ...state.concept,
          project_type_id: payload.project_type_id,
          concept_proposal_name: payload.concept_proposal_name,
          source_funds_id: payload.source_funds_id,
          concept_year: payload.concept_year,
          concept_budget: payload.concept_budget,
          concept_univercity_budget: payload.concept_univercity_budget,
          concept_leader: payload.concept_leader,
          leader_name: payload.leader_name,
          concept_phone: payload.concept_phone,
          concept_proposal_type: payload.concept_proposal_type,
          id: payload.id,
          // user_idcard: payload.user_idcard,
        },
      };

    case ADD_SUB_CONCEPT:
      return {
        ...state,
        subconcept: {
          ...state.concept,
          project_type_id: payload.project_type_id,
          concept_proposal_name: payload.concept_proposal_name,
          source_funds_id: payload.source_funds_id,
          concept_year: payload.concept_year,
          concept_budget: payload.concept_budget,
          concept_univercity_budget: payload.concept_univercity_budget,
          concept_leader: payload.concept_leader,
          leader_name: payload.leader_name,
          concept_phone: payload.concept_phone,
          concept_proposal_type: payload.concept_proposal_type,
          id: payload.id,
          // user_idcard: payload.user_idcard,
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
