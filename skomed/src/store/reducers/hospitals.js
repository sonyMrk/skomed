import {
  SET_HOSPITALS_LOADING,
  SET_HOSPITALS,
  SET_HOSPITALS_ERROR,
} from "../types";

const initialState = {
  isLoading: false,
  hospitals: [],
  errorMessage: null,
};

export const hospitalsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_HOSPITALS_LOADING: {
      return {
        ...state,
        isLoading: action.payload,
      };
    }
    case SET_HOSPITALS: {
      return {
        ...state,
        hospitals: action.payload,
      };
    }

    case SET_HOSPITALS_ERROR: {
      return {
        ...state,
        errorMessage: action.payload,
      };
    }

    default:
      return state;
  }
};
