import {
  ADD_CONCEPT,
  INSERT_CONCEPT,
  ADD_ID_SUBCONCEPT,
  ADD_SUB_CONCEPT,
  INSERT_SUB_CONCEPT,
  ADD_STUDYAREA,
  INSERT_STUDYAREA,
  ADD_NETWORK,
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
  // try {
  // const res = await ApiData.create_concept(data);
  // const data = res.data;
  // const test = data[0].push({ leader_name: leader_name });
  dispatch({
    type: ADD_CONCEPT,
    payload: data,
  });
  //   return Promise.resolve(res.data);
  // } catch (err) {
  //   return Promise.reject(err);
  // }
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

export const insertsubconcept = (data) => async (dispatch) => {
  try {
    const res = await ApiData.create_concept(data);
    dispatch({
      type: INSERT_SUB_CONCEPT,
      payload: res.data,
    });
    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const insertstudyarea = (data) => async (dispatch) => {
  try {
    const res = await ApiData.create_concept(data);
    dispatch({
      type: INSERT_STUDYAREA,
      payload: data,
    });
    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const addsubconcept = (data) => async (dispatch) => {
  // try {
  //   const res = await ApiData.create_concept({
  //     data,
  //     // leader_name,
  //   });

  // const data = res.data;
  // const test = data[0].push({ leader_name: leader_name });
  dispatch({
    type: ADD_SUB_CONCEPT,
    payload: data,
  });

  //   return Promise.resolve(res.data);
  // } catch (err) {
  //   return Promise.reject(err);
  // }
};

export const updateIDsubconcept =
  (concpt_proposal_sub, id) => async (dispatch) => {
    try {
      const res = await ApiData.updateIDsubconcept({
        concpt_proposal_sub,
        id,
        // leader_name,
      });

      // const data = res.data;
      // const test = data[0].push({ leader_name: leader_name });
      dispatch({
        type: ADD_ID_SUBCONCEPT,
        payload: res.data,
      });

      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };

export const addstudyarea = (data) => async (dispatch) => {
  // try {
  //   const res = { data };

  dispatch({
    type: ADD_STUDYAREA,
    payload: data,
  });

  //   return Promise.resolve(res.data);
  // } catch (err) {
  //   return Promise.reject(err);
  // }
};

export const addnetwork = (data) => async (dispatch) => {
  // try {
  //   const res = { data };

  dispatch({
    type: ADD_NETWORK,
    payload: data,
  });

  //   return Promise.resolve(res.data);
  // } catch (err) {
  //   return Promise.reject(err);
  // }
};
