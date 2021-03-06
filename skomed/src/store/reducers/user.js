import {
  SET_USER_DATA,
  SET_USER_PROFILE,
  SET_USER_LOADING,
  SET_USER_ERROR,
  SET_SICK_LIST_INFO,
  CLEAR_SICK_LIST_INFO,
  CLEAR_USER_ERROR,
  SET_MEDICAL_DOC_TYPES,
  SET_AUTH_REQUEST,
  CLEAR_AUTH_REQUEST,
  SET_VISIBLE_CONFIRM_CODE_FIELD,
  CLEAR_SICK_LIST_ERROR,
  SET_SICK_LIST_ERROR,
  SET_USER_FAMILY,
} from "../types";

const initialState = {
  userData: null,
  profile: null,
  family: null,
  isLoading: false,
  errorMessage: null,
  sickListError: null,
  sickList: null,
  doctypes: null,
  authRequest: null,
  isVisibleConfirmCodeField: true,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SICK_LIST_INFO: {
      return {
        ...state,
        sickList: action.payload,
      };
    }

    case SET_MEDICAL_DOC_TYPES: {
      return {
        ...state,
        doctypes: action.payload,
      };
    }

    case CLEAR_SICK_LIST_INFO: {
      return {
        ...state,
        sickList: null,
      };
    }

    case SET_USER_DATA: {
      return {
        ...state,
        userData: action.payload,
      };
    }

    case SET_USER_PROFILE: {
      return {
        ...state,
        profile: action.payload,
      };
    }

    case SET_USER_FAMILY: {
      return {
        ...state,
        family: action.payload,
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
        errorMessage: null,
      };
    }

    case SET_USER_LOADING: {
      return {
        ...state,
        isLoading: action.payload,
      };
    }

    case SET_AUTH_REQUEST: {
      return {
        ...state,
        authRequest: action.payload,
      };
    }

    case CLEAR_AUTH_REQUEST: {
      return {
        ...state,
        authRequest: null,
      };
    }

    case SET_VISIBLE_CONFIRM_CODE_FIELD: {
      return {
        ...state,
        isVisibleConfirmCodeField: action.payload,
      };
    }

    case CLEAR_SICK_LIST_ERROR: {
      return {
        ...state,
        sickListError: null,
      };
    }

    case SET_SICK_LIST_ERROR: {
      return {
        ...state,
        sickListError: action.payload,
      };
    }

    default:
      return state;
  }
};
