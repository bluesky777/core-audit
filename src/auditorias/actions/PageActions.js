import { PAGE_TYPES } from "./PageTypes";

export const setSidebarShow = (val) => (dispatch, getState) => {
  dispatch({ type: PAGE_TYPES.SHOW_SIDEBAR, sidebarShow: val });
};
