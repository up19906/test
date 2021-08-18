import {
  INSERT_COORDINATOR_FUNDING,
  GETONE_COORDINATOR_FUNDING,
  UPDATE_COORDINATOR_FUNDING,
  INSERT_SOURCEFUND,
  GET_RESEARCH_FACULTY,
  GET_BUDGET_TYPE,
  GET_FUNDING_STATUS,
  CLEAR_COORDINATOR_FUNDING,
} from "../types";

import ApiData from "../../api";

export const getresearch_faculty = () => async (dispatch) => {
  try {
    const res = await ApiData.getresearch_faculty();
    dispatch({
      type: GET_RESEARCH_FACULTY,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getbudget_type = () => async (dispatch) => {
  try {
    const res = await ApiData.getbudget_type();
    dispatch({
      type: GET_BUDGET_TYPE,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getfunding_status = () => async (dispatch) => {
  try {
    const res = await ApiData.getfunding_status();
    dispatch({
      type: GET_FUNDING_STATUS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const insertfunding = (data) => async (dispatch) => {
  try {
    const res = await ApiData.created_funding(data);
    dispatch({
      type: INSERT_COORDINATOR_FUNDING,
      payload: res.data,
    });
    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const insertsource_fund = (data) => async (dispatch) => {
  try {
    const res = await ApiData.createsource_funds(data);
    dispatch({
      type: INSERT_SOURCEFUND,
      payload: res.data,
    });
    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

//Update Funding
export const getonefunding = (id) => async (dispatch) => {
  try {
    const res = await ApiData.getone_coordinator_funding(id);
    dispatch({
      type: GETONE_COORDINATOR_FUNDING,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};
export const updatefunding = (id, data) => async (dispatch) => {
  try {
    const res = await ApiData.update_coordinator_funding(id, data);
    dispatch({
      type: UPDATE_COORDINATOR_FUNDING,
      payload: res.data,
    });
    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

//End Update Funding

export const clearfunding = () => async (dispatch) => {
  dispatch({
    type: CLEAR_COORDINATOR_FUNDING,
    payload: [],
  });
};
