import {
  SET_EXPO_PUSH_TOKEN,
  SET_INIT_APP,
  SET_NOTIFICATIONS,
  SET_NEW_NOTIFICATIONS_COUNT,
  SET_SUBSCRIBER_ID,
} from "../types";

const initialState = {
  isInitApp: false,
  notifications: null,
  newNotificationsCount: 0,
  expoPushToken: null,
  subscriberId: null,
};

export const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_INIT_APP: {
      return {
        ...state,
        isInitApp: true,
      };
    }

    case SET_EXPO_PUSH_TOKEN: {
      return {
        ...state,
        expoPushToken: action.payload,
      };
    }

    case SET_SUBSCRIBER_ID: {
      return {
        ...state,
        subscriberId: action.payload,
      };
    }

    case SET_NOTIFICATIONS: {
      return {
        ...state,
        notifications: action.payload,
      };
    }

    case SET_NEW_NOTIFICATIONS_COUNT: {
      return {
        ...state,
        newNotificationsCount: action.payload,
      };
    }

    default:
      return state;
  }
};
