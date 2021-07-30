import { ADD_CONCEPT, ADD_STUDYAREA, ADD_NETWORK } from "../types";

// import ApiData from "../../api";

export const addconcept =
  (
    selectProjectType,
    project_name,
    selectSourceFunds,
    project_budget,
    project_star,
    project_agency,
    project_status
  ) =>
  async (dispatch) => {
    try {
      const res = {
        selectProjectType,
        project_name,
        selectSourceFunds,
        project_budget,
        project_star,
        project_agency,
        project_status,
      };

      dispatch({
        type: ADD_CONCEPT,
        payload: res.data,
      });

      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  

export const addstudyarea = (title, description) => async (dispatch) => {
  try {
    const res = { title, description };

    dispatch({
      type: ADD_STUDYAREA,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const addnetwork = (title, description) => async (dispatch) => {
  try {
    const res = { title, description };

    dispatch({
      type: ADD_NETWORK,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};
