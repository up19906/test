import {
  ADD_CONCEPT,
  ADD_STUDYAREA,
  ADD_NETWORK,
  GET_USER,
  GET_SOURCEFUND,
  GET_PROJECT_TYPE,
  GET_YEAR,
} from "../types";

import ApiData from "../../api";

export const getyear = () => async (dispatch) => {
  var date = new Date();
  const year = [
    { value: [date.getFullYear() + 544] },
    { value: [date.getFullYear() + 543] },
    { value: [date.getFullYear() + 542] },
    { value: [date.getFullYear() + 541] },
    { value: [date.getFullYear() + 540] },
    { value: [date.getFullYear() + 539] },
  ];
  try {
    dispatch({
      type: GET_YEAR,
      payload: year,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getprojecttype = () => async (dispatch) => {
  try {
    const res = await ApiData.getproject_type();

    dispatch({
      type: GET_PROJECT_TYPE,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getUser = () => async (dispatch) => {
  try {
    const res = await ApiData.getuser();

    dispatch({
      type: GET_USER,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getSource_funds = () => async (dispatch) => {
  try {
    const res = await ApiData.getsource_funds();

    dispatch({
      type: GET_SOURCEFUND,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const updateInput = (input) => ({
  type: "UPDATE_INPUT",
  payload: { txt: input },
});
export const updateInput2 = (input) => ({
  type: "UPDATE_INPUT2",
  payload: { test: input },
});

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
        payload: {
          selectProjectType: selectProjectType,
          project_name: project_name,
          selectSourceFunds: selectSourceFunds,
          project_budget: project_budget,
          project_star: project_star,
          project_agency: project_agency,
          project_status: project_status,
        },
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
