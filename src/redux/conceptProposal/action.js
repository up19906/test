import {
  ADD_CONCEPT,
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

export const get_co_research_group = () => async (dispatch) => {
  try {
    const res = await ApiData.get_co_research_group();

    dispatch({
      type: GET_CO_RESEARCH_GROUP,
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

export const addconcept = (data) => async (dispatch) => {
  dispatch({
    type: ADD_CONCEPT,
    payload: data,
  });
};

export const addsubconcept = (data) => async (dispatch) => {
  dispatch({
    type: ADD_SUB_CONCEPT,
    payload: data,
  });
};

export const addstudyarea = (data) => async (dispatch) => {
  dispatch({
    type: ADD_STUDYAREA,
    payload: data,
  });
};

export const addnetwork = (data) => async (dispatch) => {
  dispatch({
    type: ADD_NETWORK,
    payload: data,
  });
};

export const insertconcept = (data) => async (dispatch) => {
  try {
    const res = await ApiData.create_concept(data);
    dispatch({
      type: INSERT_CONCEPT,
      payload: res.data,
    });
    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const clearconcept = () => async (dispatch) => {
  dispatch({
    type: CLEAR_CONCEPT,
    payload: [],
  });
};
