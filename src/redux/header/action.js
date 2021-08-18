import { OPENMENU, CLOSEMENU, OPENSIDEBAR, CLOSESIDEBAR ,REMOVE_USER_LOGIN } from "../types";

export function openmenu() {
  return {
    type: OPENMENU,
  };
}

export function closemenu() {
  return {
    type: CLOSEMENU,
  };
}

export function opensidebar() {
  return {
    type: OPENSIDEBAR,
  };
}
export function closesidebar() {
  return {
    type: CLOSESIDEBAR,
  };
}


export function removeruserlogin() {
  return {
    type: REMOVE_USER_LOGIN,
  };
}
