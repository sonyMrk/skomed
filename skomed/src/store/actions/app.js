import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  SET_EXPO_PUSH_TOKEN,
  SET_INIT_APP,
  SET_NOTIFICATIONS,
  SET_NEW_NOTIFICATIONS_COUNT,
  SET_NOTIFICATIONS_ERROR,
  SET_NOTIFICATIONS_LOADING,
  SET_DEVICE_ID,
  CLEAR_HISTOTRY_APPOINTMENTS_ERROR,
  SET_HISTOTRY_APPOINTMENTS_ERROR,
  SET_HISTOTRY_APPOINTMENTS,
} from "../types";
import newId from "../../utils/newId";
import { SET_SUBSCRIBER_ID } from "./../types";
import { appApi } from "./../../services/appApi";

export const setInitApp = () => ({
  type: SET_INIT_APP,
});

export const setExpoPushToken = (payload) => ({
  type: SET_EXPO_PUSH_TOKEN,
  payload,
});

export const setSubscriberId = (payload) => ({
  type: SET_SUBSCRIBER_ID,
  payload,
});

export const setNotifications = (payload) => ({
  type: SET_NOTIFICATIONS,
  payload,
});

export const setNewNotificationsCount = (payload) => ({
  type: SET_NEW_NOTIFICATIONS_COUNT,
  payload,
});

export const setNotificationsError = (payload) => ({
  type: SET_NOTIFICATIONS_ERROR,
  payload,
});

export const setNotificationsLoading = (payload) => ({
  type: SET_NOTIFICATIONS_LOADING,
  payload,
});

export const setDeviceId = (payload) => ({
  type: SET_DEVICE_ID,
  payload,
});

export const setHistoryAppointmentsError = (payload) => ({
  type: SET_HISTOTRY_APPOINTMENTS_ERROR,
  payload,
});

export const clearHistoryAppointmentsLoading = () => ({
  type: CLEAR_HISTOTRY_APPOINTMENTS_ERROR,
});

export const setHistoryAppointments = (payload) => ({
  type: SET_HISTOTRY_APPOINTMENTS,
  payload,
});

export const saveDeviceID = (deviceID) => async (dispatch) => {
  try {
    const oldDeviceId = await AsyncStorage.getItem("deviceId");
    if (oldDeviceId) {
      dispatch(setDeviceId(JSON.parse(oldDeviceId)));
    } else {
      await AsyncStorage.setItem("deviceId", JSON.stringify(deviceID));
      dispatch(setDeviceId(deviceID));
    }
  } catch (error) {
    dispatch(setNotificationsError("Ошибка сети, попробуйте еще раз"));
    console.log("saveDeviceID", error);
  }
};

export const getSubscriberID = () => async (dispatch) => {
  try {
    let newSubscriberId = await AsyncStorage.getItem("subscriberId");

    if (newSubscriberId) {
      dispatch(setSubscriberId(newSubscriberId));
    } else {
      newSubscriberId = newId();
      await AsyncStorage.setItem(
        "subscriberId",
        JSON.stringify(newSubscriberId)
      );
      dispatch(setSubscriberId(newSubscriberId));
    }
  } catch (error) {
    dispatch(setNotificationsError("Ошибка сети, попробуйте еще раз"));
    console.log("subscriberId", error);
  }
};

export const getNewNotificationsCount = (deviceGUID) => async (dispatch) => {
  try {
    const userProfile = await AsyncStorage.getItem("profile");

    const authToken = JSON.parse(userProfile)?.AuthToken;

    const respData = await appApi.GetNewMessagesCount(deviceGUID, authToken);

    if (respData.ErrorCode !== 0) {
      dispatch(setNotificationsError(respData.ErrorDesc));
    } else {
      dispatch(setNewNotificationsCount(respData.MessagesCount));
    }
  } catch (error) {
    dispatch(setNotificationsError("Ошибка сети, попробуйте еще раз"));
    console.log("getNewNotificationsCount", error);
  }
};

export const getMessageForUser = (deviceGUID) => async (dispatch) => {
  try {
    const userProfile = await AsyncStorage.getItem("profile");

    const authToken = JSON.parse(userProfile)?.AuthToken;

    const respData = await appApi.GetMessagesForUser(deviceGUID, authToken);

    if (respData.ErrorCode !== 0) {
      dispatch(setNotificationsError(respData.ErrorDesc));
    } else {
      dispatch(setNotifications(respData.Messages));
    }
  } catch (error) {
    dispatch(setNotificationsError("Ошибка сети, попробуйте еще раз"));
    console.log("getNewNotificationsCount", error);
  }
};

export const updateSubscriberData = (SubscriberID) => async (dispatch) => {
  try {
    const userProfile = await AsyncStorage.getItem("profile");
    const DeviceID = await AsyncStorage.getItem("deviceId");

    const AuthToken = JSON.parse(userProfile)?.AuthToken;

    if (!DeviceID) {
      const respData = await appApi.UpdateSubscriberData(
        SubscriberID,
        AuthToken
      );

      if (respData.ErrorCode !== 0) {
        dispatch(setNotificationsError(respData.ErrorDesc));
      } else {
        dispatch(saveDeviceID(respData.DeviceGUID));
      }
    } else {
      dispatch(saveDeviceID(DeviceID));
    }
  } catch (error) {
    dispatch(setNotificationsError("Ошибка сети, попробуйте еще раз"));
    console.log("updateSubscriberData", error);
  }
};

export const confirmMessageViewingOnDevice = (
  SubscriberID,
  deviceId,
  MessageGUID,
  expoPushToken
) => async (dispatch) => {
  try {
    const userProfile = await AsyncStorage.getItem("profile");
    const AuthToken = JSON.parse(userProfile)?.AuthToken;

    const respMessageData = await appApi.ConfirmMessageViewingOnDevice(
      deviceId,
      MessageGUID
    );

    if (respMessageData.ErrorCode === 0) {
      dispatch(getMessageForUser(deviceId, AuthToken));
      dispatch(getNewNotificationsCount(deviceId, AuthToken));
    }
  } catch (error) {
    dispatch(setNotificationsError("Ошибка сети, попробуйте еще раз"));
    console.log("confirmMessageViewingOnDevice", error);
  }
};

export const getHistoryAppointments = () => async (dispatch) => {
  try {
    let history = await AsyncStorage.getItem("history");

    if (history) {
      const parsedHistory = JSON.parse(history);

      dispatch(setHistoryAppointments(parsedHistory));
    } else {
      await AsyncStorage.setItem(
        "history",
        JSON.stringify({
          appointments: [],
          houseCalls: [],
        })
      );
      dispatch(setHistoryAppointments([]));
    }
  } catch (error) {
    dispatch(setHistoryAppointmentsError("Ошибка, попробуйте еще раз"));
    console.log("getHistoryAppointments", error);
  }
};

export const removeItemFromHistoryAppointments = (id, regType) => async (
  dispatch
) => {
  try {
    const types = {
      1: "appointments",
      2: "houseCalls",
    };

    const currentType = types[regType];

    dispatch(setAppointmentSaveLoading(true));

    const history = await AsyncStorage.getItem("history");

    const updateHistory = JSON.parse(history);

    const filteredHistory = updateHistory[currentType].filter(
      (rec) => rec.GUID !== id
    );

    updateHistory[currentType] = filteredHistory;

    await AsyncStorage.setItem("history", JSON.stringify(updateHistory));

    dispatch(getHistoryAppointments());
  } catch (error) {
    dispatch(setHistoryAppointmentsError("Ошибка, попробуйте еще раз"));
    console.log("getHistoryAppointments", error);
  }
};
