import React from "react";
import { Text, View } from "react-native";
import { useSelector } from "react-redux";
import {
  getExpoPushTokenState,
  getAppNotificationsState,
} from "../store/selectors/app";

export const NotificationScreen = () => {
  const expoPushToken = useSelector(getExpoPushTokenState);
  const notifications = useSelector(getAppNotificationsState);

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {notifications &&
        notifications.map((notification) => {
          return (
            <Text key={notification.MessageGUID} style={{ padding: 20 }}>
              {notification.Text}
            </Text>
          );
        })}
      <Text style={{ textAlign: "center" }}>
        Your expo push token: {expoPushToken}
      </Text>
    </View>
  );
};
