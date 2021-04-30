import {
  SET_HOSPITALS_LOADING,
  SET_HOSPITALS_FOR_APPOINTMENT,
  SET_HOSPITALS_ERROR,
  CLEAR_HOSPITALS_ERROR,
  SET_ALL_HOSPITALS,
  CLEAR_ALL_HOSPITALS,
  CLEAR_HOSPITALS_FOR_APPOINTMENT,
  SET_ALL_MO,
  CLEAR_ALL_MO
} from "../types";

const initialState = {
  isLoading: false,
  hospitalsForAppointment: null,
  allMo: null,
  allHospitals: null,
  errorMessage: null,
  // s: {
  //   ErrorDesc: "",
  //   data: {
  //     locals: [{ label: "Петропавловск", value: "Петропавловск" }],
  //     type: [{ label: "Больница", value: "Больница" }],
  //     items: [{}, {}, {}]
  //   }
  // }
};

export const hospitalsReducer = (state = initialState, action) => {
  switch (action.type) {

    case SET_ALL_MO: {
      return {
        ...state,
        allMo: action.payload
      }
    }

    case CLEAR_ALL_MO: {
      return {
        ...state,
        allMo: null
      }
    }

    case SET_HOSPITALS_LOADING: {
      return {
        ...state,
        isLoading: action.payload,
      };
    }
    case SET_HOSPITALS_FOR_APPOINTMENT: {
      return {
        ...state,
        hospitalsForAppointment: action.payload,
      };
    }

    case SET_ALL_HOSPITALS: {
      return {
        ...state,
        allHospitals: action.payload
      }
    }

    case SET_HOSPITALS_ERROR: {
      return {
        ...state,
        errorMessage: action.payload,
      };
    }

    case CLEAR_HOSPITALS_ERROR: {
      return {
        ...state,
        errorMessage: null,
      };
    }

    case CLEAR_ALL_HOSPITALS: {
      return {
        ...state,
        allHospitals: null
      }
    }

    case CLEAR_HOSPITALS_FOR_APPOINTMENT: {
      return {
        ...state, 
        hospitalsForAppointment: null
      }
    }

    default:
      return state;
  }
};
