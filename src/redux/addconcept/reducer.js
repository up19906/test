import { ADD_CONCEPT, ADD_SUB_CONCEPT } from "../types";

const test = {
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
  subconcept: {
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
};
export default function reducerconcept(state = test, action) {
  const { type, payload } = action;

  switch (type) {
    // case ADD_CONCEPT:
    //   return {
    //     ...state.concept,
    //     concept_budget: payload.concept_budget,
    //     concept_leader: payload.concept_leader,
    //     concept_phone: payload.concept_phone,
    //     concept_proposal_name: payload.concept_proposal_name,
    //     concept_proposal_paln_master: payload.concept_proposal_paln_master,
    //     concept_proposal_paln_sub: payload.concept_proposal_paln_sub,
    //     concept_proposal_type: payload.concept_proposal_type,
    //     concept_univercity_budget: payload.concept_univercity_budget,
    //     concept_year: payload.concept_year,
    //     id: payload.id,
    //     user_idcard: payload.user_idcard,
    //   };

    case ADD_SUB_CONCEPT:
      return {
        ...state.subconcept,
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
      };

    default:
      return state;
  }
}
