import React, { useEffect, useState, useRef } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import { useSelector, useDispatch } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { Platform, Dimensions } from "react-native";

import { NotificationStackScreen } from "./stacks/NotificationStackScreen";
import { ProfileStackScreen } from "./stacks/ProfileStackScreen";
import { MainStackScreen } from "./stacks/MainStackScreen";

import { THEME } from "../theme";
import { Preloader } from "../components/ui/Preloader";
import {
  getInitAppState,
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
} from "../store/actions/app";
import { HistoryStackScreen } from "./stacks/HistoryStackScreen";
import { getHistoryAppointments } from "../store/actions/appointment";
import { getUserProfileState } from "../store/selectors/user";
import { normalize } from "../utils/normalizeFontSize";

// нижняя навигация

const BottonmTabNavigation = createBottomTabNavigator();

const AppNavigation = () => {
  const isInit = useSelector(getInitAppState);

  const pushToken = useSelector(getExpoPushTokenState);
  const subscriberId = useSelector(getSubscriberIdState);
  const deviceId = useSelector(getDeviceIdState);
  const profileData = useSelector(getUserProfileState);

  console.log("PUSH_TOKEN", pushToken);
  console.log("isInit", isInit);

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
          inactiveBackgroundColor: "#fff",
          activeTintColor: "#c7eaea",
          inactiveTintColor: "#8E8E93",
          style: {
            height: Dimensions.get("window").height / 12,
            paddingBottom: 10,
          },
        }}
      >
        <BottonmTabNavigation.Screen
          name="Main"
          component={MainStackScreen}
          options={{
            tabBarLabel: "Сервисы",
            tabBarIcon: ({ color }) => (
              <Ionicons
                name="ios-home-outline"
                size={normalize(24)}
                color={color}
              />
            ),
          }}
        />

        <BottonmTabNavigation.Screen
          name="Profile"
          component={ProfileStackScreen}
          options={{
            tabBarLabel: "Профиль",
            tabBarIcon: ({ color }) => (
              <Ionicons
                name="md-people-outline"
                size={normalize(24)}
                color={color}
              />
            ),
          }}
        />
        <BottonmTabNavigation.Screen
          name="History"
          component={HistoryStackScreen}
          options={{
            tabBarLabel: "Мои записи",
            tabBarIcon: ({ color }) => (
              <Ionicons
                name="file-tray-stacked-outline"
                size={normalize(24)}
                color={color}
              />
            ),
          }}
        />
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
