import {
  SET_USER_DATA,
  SET_USER_PROFILE,
  SET_USER_LOADING,
  SET_USER_ERROR,
} from "../types";

const initialState = {
  userData: null,
  profile: null,
  isLoading: false,
  errorMessage: null,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
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
