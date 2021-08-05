import { ADD_CONCEPT, ADD_STUDYAREA, ADD_NETWORK } from "../types";

import ApiData from "../../api";

export const addconcept =
  (
    selectProjectType,
    project_name,
    selectSourceFunds,
    concept_year,
    project_budget,
    concept_univercity_budget,
    select_researchname,
    userid,
    concept_phone,
    project_status
  ) =>
  async (dispatch) => {
    try {
      const res = await ApiData.create_concept({
        selectProjectType,
        project_name,
        selectSourceFunds,
        concept_year,
        project_budget,
        concept_univercity_budget,
        select_researchname,
        userid,
        concept_phone,
        project_status,
      });

      dispatch({
        type: ADD_CONCEPT,
        payload: res.data,
      });

      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };

export const addsubconcept =
  (
    selectProjectType,
    project_name,
    selectSourceFunds,
    concept_year,
    project_budget,
    concept_univercity_budget,
    select_researchname,
    userid,
    concept_phone,
    project_status
  ) =>
  async (dispatch) => {
    try {
      const res = await ApiData.createsub_concept({
        selectProjectType,
        project_name,
        selectSourceFunds,
        concept_year,
        project_budget,
        concept_univercity_budget,
        select_researchname,
        userid,
        concept_phone,
        project_status,
      });

      dispatch({
        type: ADD_CONCEPT,
        payload: res.data,
      });

      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
