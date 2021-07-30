import { OPENMENU, CLOSEMENU, OPENSIDEBAR, CLOSESIDEBAR } from "../types";

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
