import {
  SET_APPOINTMENT_USER_DATA,
  SET_APPOINTMENT_LOADING,
  SET_APPOINTMENT_ERROR,
  CLEAR_APPOINTMENT_USER_DATA,
} from "../types";

const initialState = {
  isLoading: false,
  userData: null,
  errorMessage: null,
};

export const appointmentReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_APPOINTMENT_USER_DATA: {
      return {
        ...state,
        userData: action.payload,
      };
    }
    case CLEAR_APPOINTMENT_USER_DATA: {
      return {
        ...state,
        userData: null
      }
    }

    case SET_APPOINTMENT_LOADING: {
      return {
        ...state,
        isLoading: action.payload,
      };
    }

    case SET_APPOINTMENT_ERROR: {
      return {
        ...state,
        errorMessage: action.payload,
      };
    }
    default:
      return state;
  }
};
