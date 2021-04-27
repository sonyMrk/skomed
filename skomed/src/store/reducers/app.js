import { SET_INIT_APP } from "../types";

const initialState = {
  isInitApp: false,
};

export const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_INIT_APP: {
      return {
        isInitApp: true,
      };
    }

    default:
      return state;
  }
};
