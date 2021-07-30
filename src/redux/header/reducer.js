import { OPENMENU, CLOSEMENU, OPENSIDEBAR, CLOSESIDEBAR } from "../types";
const initialState = {
  menu: false,
  sidebar: true,
};

export default function reducerhome(state = initialState, action) {
  const { type } = action;

  switch (type) {
    case OPENMENU:
      return { ...state, menu: true };

    case CLOSEMENU:
      return { ...state, menu: false };

    case OPENSIDEBAR:
      return { ...state, sidebar: false };

    case CLOSESIDEBAR:
      return { ...state, sidebar: true };

    default:
      return state;
  }
}
