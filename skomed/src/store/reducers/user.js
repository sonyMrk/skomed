import {
  SET_USER_DATA,
  SET_USER_PROFILE,
  SET_USER_LOADING,
  SET_USER_ERROR,
  SET_SICK_LIST_INFO,
  CLEAR_SICK_LIST_INFO,
  CLEAR_USER_ERROR,
  SET_MEDICAL_DOC_TYPES
} from "../types";

const initialState = {
  userData: null,
  profile: null,
  isLoading: false,
  errorMessage: null,
  sickList: null,
  doctypes: null
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SICK_LIST_INFO: {
      return {
        ...state,
        sickList: action.payload
      }
    }

    case SET_MEDICAL_DOC_TYPES: {
      return {
        ...state,
        doctypes: action.payload
      }
    }

    case CLEAR_SICK_LIST_INFO: {
      return {
        ...state,
        sickList: null
      }
    }
    
    case SET_USER_DATA: {
      return {
        ...state,
        userData: {
          ...action.payload,
        },
      };
    }

    case SET_USER_PROFILE: {
      return {
        ...state,
        profile: action.payload,
      };
    }

    case SET_USER_ERROR: {
      return {
        ...state,
        errorMessage: action.payload,
      };
    }

    case CLEAR_USER_ERROR: {
      return {
        ...state,
        errorMessage: null
      }
    }

    case SET_USER_LOADING: {
      return {
        ...state,
        isLoading: action.payload,
      };
    }

    default:
      return state;
  }
};
