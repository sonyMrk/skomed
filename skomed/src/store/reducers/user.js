import {
  SET_USER_DATA,
  SET_USER_PROFILE,
  SET_USER_FAMILY,
  ADD_PERSON_FAMILY,
  EDIT_PERSON_FAMILY,
  REMOVE_PERSON_FAMILY,
  SET_USER_IIN,
  SET_USER_LOADING,
  SET_ERROR,
} from "../types";

const initialState = {
  userData: null,
  profile: null,
  isLoading: false,
  errorMessage: null
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

    case ADD_PERSON_FAMILY: {
      return {
        ...state,
        profile: {
          ...state.profile,
          userFamily: [...state.profile.userFamily, action.payload],
        },
      };
    }

    case EDIT_PERSON_FAMILY: {
      return {
        ...state,
        profile: {
          ...state.profile,
          userFamily: state.userFamily.map((person) => {
            if (person.iin === action.payload.iin) {
              person = { ...action.payload };
            }
            return person;
          }),
        },
      };
    }

    case SET_ERROR: {
        return {
            ...state,
            errorMessage: action.payload
        }
    }

    case REMOVE_PERSON_FAMILY: {
      return {
        ...state,
        profile: {
          ...state.profile,
          userFamily: state.userFamily.filter(
            (person) => person.iin !== action.payload
          ),
        },
      };
    }

    case SET_USER_IIN: {
      return {
        ...state,
        profile: { ...state.profile, iin: action.payload },
      };
    }

    case SET_USER_LOADING: {
        console.log("action.payload====", action.payload)
      return {
        ...state,
        isLoading: action.payload,
      };
    }

    default:
      return state;
  }

  return state;
};
