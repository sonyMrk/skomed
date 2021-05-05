import {
  SET_HOSPITALS_LOADING,
  SET_HOSPITALS_FOR_APPOINTMENT,
  SET_HOSPITALS_ERROR,
  CLEAR_HOSPITALS_ERROR,
  SET_ALL_HOSPITALS,
  CLEAR_ALL_HOSPITALS,
  CLEAR_HOSPITALS_FOR_APPOINTMENT,
  SET_ALL_MO,
  CLEAR_ALL_MO,
  SET_DATA_LIST_FOR_TIMETABLE,
  CLEAR_DATA_LIST_FOR_TIMETABLE,
  SET_DOCTORS_LIST_LOADING,
  SET_DOCTORS_TIMETABLE,
  SET_DOCTORS_TIMETABLE_LOADING,
  CLEAR_DOCTORS_TIMETABLE
} from "../types";

const initialState = {
  isLoading: false,
  hospitalsForAppointment: null,
  allMo: null,
  allHospitals: null,
  errorMessage: null,
  dataListForTimetable: null,
  doctorsListLoading: false,
  doctorTimetable: null,
  doctorTimetableLoading: false
};

export const hospitalsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ALL_MO: {
      return {
        ...state,
        allMo: action.payload,
      };
    }

    case CLEAR_ALL_MO: {
      return {
        ...state,
        allMo: null,
      };
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
        allHospitals: action.payload,
      };
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
        allHospitals: null,
      };
    }

    case CLEAR_HOSPITALS_FOR_APPOINTMENT: {
      return {
        ...state,
        hospitalsForAppointment: null,
      };
    }

    case SET_DATA_LIST_FOR_TIMETABLE: {
      return {
        ...state,
        dataListForTimetable: action.payload
      }
    }

    case CLEAR_DATA_LIST_FOR_TIMETABLE: {
      return {
        ...state,
        dataListForTimetable: null
      }
    }

    case SET_DOCTORS_LIST_LOADING: {
      return {
        ...state,
        doctorsListLoading: action.payload
      }
    }
    
    case SET_DOCTORS_TIMETABLE: {
      return {
        ...state,
        doctorTimetable: action.payload
      }
    }

    case SET_DOCTORS_TIMETABLE_LOADING: {
      return {
        ...state,
        doctorTimetableLoading: action.payload
      }
    }

    case CLEAR_DOCTORS_TIMETABLE: {
      return {
        ...state,
        doctorTimetable: null,
      }
    }

    default:
      return state;
  }
};
