import {
  SET_APPOINTMENT_USER_DATA,
  SET_APPOINTMENT_LOADING,
  SET_APPOINTMENT_ERROR,
  CLEAR_APPOINTMENT_USER_DATA,
  SET_APPOINTMENT_SHEDULE,
  CLEAR_APPOINTMENT_SHEDULE,
  SET_APPOINTMENT_PROFILE_SPECS,
  CLEAR_APPOINTMENT_PROFILE_SPECS,
  SET_APPOINTMENT_LOADING_USER_DATA,
  SET_APPOINTMENT_LOADING_SHEDULE,
  SET_APPOINTMENT_LOADING_PROFILE_SPECS
} from "../types";

const initialState = {
  isLoadingUserData: false,
  isLoadingShedule: false,
  isLoadingProfileSpecs: false,
  userData: null,
  errorMessage: null,
  shedule: null,
  profileSpecsData: null
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

    case SET_APPOINTMENT_LOADING_USER_DATA: {
      return {
        ...state,
        isLoadingUserData: action.payload,
      };
    }

    case SET_APPOINTMENT_LOADING_SHEDULE: {
      return {
        ...state,
        isLoadingShedule: action.payload,
      };
    }

    case SET_APPOINTMENT_LOADING_PROFILE_SPECS: {
      return {
        ...state,
        isLoadingProfileSpecs: action.payload,
      };
    }

    case SET_APPOINTMENT_ERROR: {
      return {
        ...state,
        errorMessage: action.payload,
      };
    }

    case SET_APPOINTMENT_SHEDULE: {
      return {
        ...state,
        shedule: action.payload,
      };
    }

    case CLEAR_APPOINTMENT_SHEDULE: {
      return {
        ...state,
        shedule: null
      }
    }

    case SET_APPOINTMENT_PROFILE_SPECS: {
      return {
        ...state,
        profileSpecsData: action.payload
      }
    }

    case CLEAR_APPOINTMENT_PROFILE_SPECS: {
      return {
        ...state,
        profileSpecsData: null
      }
    }
    default:
      return state;
  }
};
