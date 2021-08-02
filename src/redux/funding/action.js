import { ADD_COORDINATOR_FUNDING } from "../types";

import ApiData from "../../api";

export const createTutorial = (title, description) => async (dispatch) => {
  try {
    const res = await ApiData.create({ title, description });

    dispatch({
      type: ADD_COORDINATOR_FUNDING,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};
