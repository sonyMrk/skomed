import {
  SET_MEDICATIONS_ERROR,
  SET_MEDICATIONS_LIST,
  SET_MEDICATIONS_LIST_LOADING,
  CLEAR_MEDICATIONS_ERROR,
  CLEAR_MEDICATIONS_LIST,
} from "../types";

const initialState = {
  medicationsList: null,
  medicationsListLoading: false,
  medicationsError: null,
};

export const medicationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MEDICATIONS_LIST: {
      return {
        ...state,
        medicationsList: action.payload,
      };
    }

    case SET_MEDICATIONS_LIST_LOADING: {
      return {
        ...state,
        medicationsListLoading: action.payload,
      };
    }

    case SET_MEDICATIONS_ERROR: {
      return {
        ...state,
        medicationsError: action.payload,
      };
    }

    case CLEAR_MEDICATIONS_ERROR: {
      return {
        ...state,
        medicationsError: null,
      };
    }

    case CLEAR_MEDICATIONS_LIST: {
      return {
        ...state,
        medicationsList: null,
      };
    }
    default:
      return state;
  }
};
