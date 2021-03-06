import React, { useEffect, useRef } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import { useSelector, useDispatch } from "react-redux";
import { Platform, Dimensions } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

import { ProfileStackScreen } from "./stacks/ProfileStackScreen";
import { MainStackScreen } from "./stacks/MainStackScreen";
import { HistoryStackScreen } from "./stacks/HistoryStackScreen";

import { THEME } from "../theme";
import { Preloader } from "../components/ui/Preloader";
import {
  getInitAppState,
  getExpoPushTokenState,
  getSubscriberIdState,
  getDeviceIdState,
} from "../store/selectors/app";
import { loadUserProfile, loadUserFamily } from "../store/actions/user";
import {
  getSubscriberID,
  setExpoPushToken,
  updateSubscriberData,
  getMessageForUser,
  getNewNotificationsCount,
} from "../store/actions/app";
import { getHistoryAppointments } from "../store/actions/app";
import { normalize } from "../utils/normalizeFontSize";

// нижняя навигация

const BottonmTabNavigation = createBottomTabNavigator();

const AppNavigation = () => {
  const isInit = useSelector(getInitAppState);

  const pushToken = useSelector(getExpoPushTokenState);
  const subscriberId = useSelector(getSubscriberIdState);
  const deviceId = useSelector(getDeviceIdState);

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
    dispatch(loadUserFamily());
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
          activeTintColor: THEME.BLUE_COLOR,
          inactiveTintColor: THEME.GRAY_COLOR,
          style: {
            height: Dimensions.get("window").height / 12,
            paddingBottom: normalize(5),
          },
        }}
      >
        <BottonmTabNavigation.Screen
          name="Main"
          component={MainStackScreen}
          options={{
            tabBarLabel: "Сервисы",
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="house" size={normalize(22)} color={color} />
            ),
          }}
        />

        <BottonmTabNavigation.Screen
          name="Profile"
          component={ProfileStackScreen}
          options={{
            tabBarLabel: "Профиль",
            tabBarIcon: ({ color }) => (
              <FontAwesome
                name="user-circle-o"
                size={normalize(22)}
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
              <FontAwesome5 name="archive" size={normalize(22)} color={color} />
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
