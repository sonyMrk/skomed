import {
  SET_EXPO_PUSH_TOKEN,
  SET_INIT_APP,
  SET_NOTIFICATIONS,
  SET_NEW_NOTIFICATIONS_COUNT,
  SET_SUBSCRIBER_ID,
  SET_NOTIFICATIONS_ERROR,
  SET_NOTIFICATIONS_LOADING,
  SET_DEVICE_ID,
} from "../types";

const initialState = {
  isInitApp: false,
  notifications: null,
  notificationsError: null,
  notificationsLoading: false,
  newNotificationsCount: 0,
  expoPushToken: null,
  subscriberId: null,
  deviceId: null
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

    case SET_DEVICE_ID: {
      return {
        ...state,
        deviceId: action.payload
      }
    }

    case SET_NOTIFICATIONS: {
      return {
        ...state,
        notifications: action.payload,
      };
    }

    case SET_NOTIFICATIONS_ERROR: {
      return {
        ...state,
        notificationsError: action.payload
      }
    }

    case SET_NOTIFICATIONS_LOADING: {
      return {
        ...state,
        notificationsLoading: action.payload
      }
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
