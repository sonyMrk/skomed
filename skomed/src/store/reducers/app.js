import { SET_INIT_APP } from "../types";

const initialState = {
  isInitApp: false,
  notification: ["asdsad", "asdasd"]
};

export const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_INIT_APP: {
      return {
        ...state,
        isInitApp: true,
      };
    }

    default:
      return state;
  }
};
