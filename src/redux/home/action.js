import {
  GET_USERGROUP,
  GET_CONCEPT_PROPOSAL,
  GET_BUDGET_FUNDING,
  GET_BUDGET_FUNDING_ACADEMIC,
  GET_COUNT_FUNDING,
  GET_COUNT_FUNDING_ACADEMIC,
  GET_COORDINATOR_FUNDING,
  GET_COORDINATOR_FUNDING_ACADEMIC,
  CREATE_TUTORIAL,
  RETRIEVE_TUTORIALS,
  UPDATE_TUTORIAL,
  DELETE_TUTORIAL,
  DELETE_ALL_TUTORIALS,
} from "../types";

import ApiData from "../../api";

export const getUsergroup = () => async (dispatch) => {
  try {
    const res = await ApiData.getusergroup();

    dispatch({
      type: GET_USERGROUP,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};
export const getConcept_proposal = () => async (dispatch) => {
  try {
    const res = await ApiData.getconcept_proposal();

    dispatch({
      type: GET_CONCEPT_PROPOSAL,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

// export const findTutorialsByTitle = (title) => async (dispatch) => {
//   try {
//     const res = await ApiData.findByTitle(title);

//     dispatch({
//       type: RETRIEVE_TUTORIALS,
//       payload: res.data,
//     });
//   } catch (err) {
//     console.log(err);
//   }
// };

export const getFunding_budget = (date) => async (dispatch) => {
  try {
    const res = await ApiData.getcoordinater_funding_budgetByYear(date);

    dispatch({
      type: GET_BUDGET_FUNDING,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getFunding_academic_budget = (date) => async (dispatch) => {
  try {
    const res = await ApiData.getcoordinater_funding_budget_academicByYear(
      date
    );
    dispatch({
      type: GET_BUDGET_FUNDING_ACADEMIC,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getFunding_count = (date) => async (dispatch) => {
  try {
    const res = await ApiData.getcount_coordinater_fundingByYear(date);
    dispatch({
      type: GET_COUNT_FUNDING,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getFunding_academic_count = (date) => async (dispatch) => {
  try {
    const res = await ApiData.getcount_coordinater_funding_academicByYear(date);
    dispatch({
      type: GET_COUNT_FUNDING_ACADEMIC,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getcoordinator_funding = () => async (dispatch) => {
  try {
    const res = await ApiData.getcodinator_funding();

    dispatch({
      type: GET_COORDINATOR_FUNDING,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getcoordinator_funding_academic = () => async (dispatch) => {
  try {
    const res = await ApiData.getcoordinator_funding_academic();

    dispatch({
      type: GET_COORDINATOR_FUNDING_ACADEMIC,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const createTutorial = (title, description) => async (dispatch) => {
  try {
    const res = await ApiData.create({ title, description });

    dispatch({
      type: CREATE_TUTORIAL,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const retrieveTutorials = () => async (dispatch) => {
  try {
    const res = await ApiData.getAll();

    dispatch({
      type: RETRIEVE_TUTORIALS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const updateTutorial = (id, data) => async (dispatch) => {
  try {
    const res = await ApiData.update(id, data);

    dispatch({
      type: UPDATE_TUTORIAL,
      payload: data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const deleteTutorial = (id) => async (dispatch) => {
  try {
    await ApiData.delete(id);

    dispatch({
      type: DELETE_TUTORIAL,
      payload: { id },
    });
  } catch (err) {
    console.log(err);
  }
};

export const deleteAllTutorials = () => async (dispatch) => {
  try {
    const res = await ApiData.deleteAll();

    dispatch({
      type: DELETE_ALL_TUTORIALS,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};
