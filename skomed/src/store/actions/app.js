import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  SET_EXPO_PUSH_TOKEN,
  SET_INIT_APP,
  SET_NOTIFICATIONS,
  SET_NEW_NOTIFICATIONS_COUNT,
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
    console.log("subscriberId", error);
  }
};

export const getNewNotificationsCount = (deviceGUID, authToken) => async (
  dispatch
) => {
  try {
    const respData = await appApi.GetNewMessagesCount(deviceGUID, authToken);
    dispatch(setNewNotificationsCount(respData.MessagesCount));
  } catch (error) {
    console.log("getNewNotificationsCount", error);
  }
};

export const getMessageForUser = (deviceGUID, authToken) => async (
  dispatch
) => {
  try {
    const respData = await appApi.GetMessagesForUser(deviceGUID, authToken);
    dispatch(setNotifications(respData.Messages));
  } catch (error) {
    console.log("getNewNotificationsCount", error);
  }
};

export const updateSubscriberData = (SubscriberID, expoToken) => async (
  dispatch
) => {
  try {
    const userProfile = await AsyncStorage.getItem("profile");

    const AuthToken = userProfile?.AuthToken;
    // const SubscriberID = token ? token : deviceGUID; // если нет разрешения на получение уведомлений (token === undefined) тогда используем ID устройства

    const respData = await appApi.UpdateSubscriberData(
      SubscriberID,
      AuthToken
      // deviceGUID
      // DeviceName,
      // OSVersion,
      // AppVersion,
      // Processor,
      // RAM,
      // (DisableSubscription = pushToken === undefined)
    );

    dispatch(getNewNotificationsCount(respData.DeviceGUID, AuthToken));
    dispatch(getMessageForUser(respData.DeviceGUID, AuthToken));
  } catch (error) {
    console.log("updateSubscriberData", error);
  }
};
