import {
  SET_APPOINTMENT_USER_DATA,
  SET_APPOINTMENT_ERROR,
  CLEAR_APPOINTMENT_USER_DATA,
  SET_APPOINTMENT_SHEDULE,
  CLEAR_APPOINTMENT_SHEDULE,
  SET_APPOINTMENT_PROFILE_SPECS,
  CLEAR_APPOINTMENT_PROFILE_SPECS,
  SET_APPOINTMENT_LOADING_USER_DATA,
  SET_APPOINTMENT_LOADING_SHEDULE,
  SET_APPOINTMENT_LOADING_PROFILE_SPECS,
  CLEAR_APPOINTMENT_ERROR,
  SET_HOUSE_CALL_RESULT,
  SET_SAVE_APPOINTMENT_RESULT,
  SET_SAVE_APPOINTMENT_LOADING,
  CLEAR_HOUSE_CALL_RESULT,
  CLEAR_SAVE_APPOINTMENT_RESULT,
} from "../types";

const initialState = {
  isLoadingUserData: false,
  isLoadingShedule: false,
  isLoadingProfileSpecs: false,
  userData: null,
  errorMessage: null,
  shedule: null,
  profileSpecsData: null,
  saveHouseCallResult: null,
  saveAppointmentResult: null,
  saveAppointmentLoading: false
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
        userData: null,
      };
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
        shedule: null,
      };
    }

    case SET_APPOINTMENT_PROFILE_SPECS: {
      return {
        ...state,
        profileSpecsData: action.payload,
      };
    }

    case CLEAR_APPOINTMENT_PROFILE_SPECS: {
      return {
        ...state,
        profileSpecsData: null,
      };
    }

    case CLEAR_APPOINTMENT_ERROR: {
      return {
        ...state,
        errorMessage: null,
      };
    }

    case SET_HOUSE_CALL_RESULT: {
      return {
        ...state,
        saveHouseCallResult: action.payload
      }
    }

    case SET_SAVE_APPOINTMENT_RESULT: {
      return {
        ...state,
        saveAppointmentResult: action.payload
      }
    }

    case CLEAR_HOUSE_CALL_RESULT: {
      return {
        ...state,
        saveHouseCallResult: null
      }
    }

    case CLEAR_SAVE_APPOINTMENT_RESULT: {
      return {
        ...state,
        saveAppointmentResult: null
      }
    }

    case SET_SAVE_APPOINTMENT_LOADING: {
      return {
        ...state,
        saveAppointmentLoading: action.payload
      }
    }

    default:
      return state;
  }
};
