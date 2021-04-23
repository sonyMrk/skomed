import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";

import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

import { ProfileScreen } from "../screens/ProfileScreen";
import { MainScreen } from "../screens/MainScreen";
import { NotificationScreen } from "../screens/NotificationScreen";
import { THEME } from "../theme";

const MainStack = createStackNavigator();

const MainStackScreen = ({ navigation }) => {
  return (
    <MainStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: THEME.MAIN_COLOR,
        },
        title: "Главная",
        headerTintColor: "#fff",
      }}
    >
      <MainStack.Screen name="Main" component={MainScreen} />
    </MainStack.Navigator>
  );
};

const ProfileStack = createStackNavigator();

const ProfileStackScreen = () => {
  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: THEME.MAIN_COLOR,
        },
        title: "Профиль",
        headerTintColor: "#fff",
      }}
    >
      <ProfileStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={({ navigation }) => ({
          headerTitle: "Профиль",
          headerLeft: () => (
            <TouchableOpacity
              style={{padding: 10}}
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Ionicons name="ios-arrow-back-outline" size={24} color="white" />
            </TouchableOpacity>
          ),
        })}
      />
    </ProfileStack.Navigator>
  );
};

const NotificationStack = createStackNavigator();

const NotificationStackScreen = () => {
  return (
    <NotificationStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: THEME.MAIN_COLOR,
        },
        title: "Уведомления",
        headerTintColor: "#fff",
      }}
    >
      <NotificationStack.Screen
        name="Notification"
        component={NotificationScreen}
      />
    </NotificationStack.Navigator>
  );
};

// нижняя навигация

const BottonmTabNavigation = createBottomTabNavigator();

const AppNavigation = () => {
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
          name="Notification"
          component={NotificationStackScreen}
          options={{
            tabBarLabel: "Уведомления",
            tabBarIcon: ({ color }) => (
              <Ionicons
                name="notifications-circle-outline"
                size={27}
                color={color}
              />
            ),
          }}
        />
      </BottonmTabNavigation.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
