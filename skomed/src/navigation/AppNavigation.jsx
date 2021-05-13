import React, { useEffect, useState, useRef } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import { useSelector, useDispatch } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { Platform } from "react-native";

import { NotificationStackScreen } from "./stacks/NotificationStackScreen";
import { ProfileStackScreen } from "./stacks/ProfileStackScreen";
import { MainStackScreen } from "./stacks/MainStackScreen";

import { THEME } from "../theme";
import { Preloader } from "../components/ui/Preloader";
import {
  getInitAppState,
  getNewNotificationsCountState,
  getExpoPushTokenState,
  getSubscriberIdState,
  getDeviceIdState,
} from "../store/selectors/app";
import { loadUserProfile } from "../store/actions/user";
import {
  getSubscriberID,
  setExpoPushToken,
  updateSubscriberData,
  getMessageForUser,
  getNewNotificationsCount,
  getHistoryAppointments
} from "../store/actions/app";
import { HistoryStackScreen } from "./stacks/HistoryStackScreen";

// нижняя навигация

const BottonmTabNavigation = createBottomTabNavigator();

const AppNavigation = () => {
  const isInit = useSelector(getInitAppState);
  const newNotificationsCount = useSelector(getNewNotificationsCountState);
  const pushToken = useSelector(getExpoPushTokenState);
  const subscriberId = useSelector(getSubscriberIdState);
  const deviceId = useSelector(getDeviceIdState);

  console.log("PUSH_TOKEN", pushToken);
  console.log("isInit", isInit)
  
  const notificationListener = useRef();
  const responseListener = useRef();

  const dispatch = useDispatch();

  useEffect(() => {
    registerForPushNotificationsAsync()
      .then((token) => dispatch(setExpoPushToken(token)))
      .catch((error) => console.log(error));

    // Этот слушатель запускается всякий раз, когда приходит уведомление, когда приложение находится на переднем плане
    notificationListener.current = Notifications.addNotificationReceivedListener(
      (notification) => {
        // console.log(notification);
      }
    );

    // Этот слушатель запускается всякий раз, когда пользователь нажимает на уведомление или взаимодействует с ним (работает, когда приложение находится на переднем плане, в фоновом режиме или убито)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        // console.log(response);
      }
    );

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  useEffect(() => {
    dispatch(loadUserProfile());
    dispatch(getSubscriberID());
    dispatch(getHistoryAppointments());
  }, []);

  useEffect(() => {
    if (deviceId) {
      dispatch(getMessageForUser(deviceId));
      dispatch(getNewNotificationsCount(deviceId));
    }
  }, [deviceId]);

  useEffect(() => {
    if (subscriberId) {
      dispatch(updateSubscriberData(subscriberId));
    }
  }, [subscriberId]);

  if (!isInit) {
    return <Preloader />;
  }

  return (
    <NavigationContainer>
      <BottonmTabNavigation.Navigator
        tabBarOptions={{
          activeBackgroundColor: "#379494",
          inactiveBackgroundColor: THEME.MAIN_COLOR,
          activeTintColor: "#c7eaea",
          inactiveTintColor: "#fff",
          showLabel: false,
        }}
      >
        <BottonmTabNavigation.Screen
          name="Main"
          component={MainStackScreen}
          options={{
            tabBarLabel: "Главная",
            tabBarIcon: ({ color }) => (
              <Ionicons name="ios-home-outline" size={27} color={color} />
            ),
          }}
        />
        <BottonmTabNavigation.Screen
          name="Profile"
          component={ProfileStackScreen}
          options={{
            tabBarLabel: "Профиль",
            tabBarIcon: ({ color }) => (
              <Ionicons name="md-people-outline" size={27} color={color} />
            ),
          }}
        />
        <BottonmTabNavigation.Screen
          name="History"
          component={HistoryStackScreen}
          options={{
            tabBarLabel: "История записей",
            tabBarBadge:
              newNotificationsCount > 0 ? newNotificationsCount : null,
            tabBarIcon: ({ color }) => (
              <Ionicons name="file-tray-stacked-outline" size={25} color={color} />
            ),
          }}
        ></BottonmTabNavigation.Screen>
        <BottonmTabNavigation.Screen
          name="Notification"
          component={NotificationStackScreen}
          options={{
            tabBarLabel: "Уведомления",
            tabBarBadge:
              newNotificationsCount > 0 ? newNotificationsCount : null,
            tabBarIcon: ({ color }) => (
              <Ionicons
                name="notifications-circle-outline"
                size={27}
                color={color}
              />
            ),
          }}
        ></BottonmTabNavigation.Screen>
      </BottonmTabNavigation.Navigator>
    </NavigationContainer>
  );
};

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const registerForPushNotificationsAsync = async () => {
  let token;
  if (Constants.isDevice) {
    const {
      status: existingStatus,
    } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("У вас отключены push-уведомления!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    // console.log(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
};

export default AppNavigation;
