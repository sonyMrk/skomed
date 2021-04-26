import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, CommonActions } from "@react-navigation/native";

import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

import { ProfileScreen } from "../screens/ProfileScreen";
import { MainScreen } from "../screens/MainScreen";
import { NotificationScreen } from "../screens/NotificationScreen";
import { THEME } from "../theme";
import { HospitalSelectionScreen } from "../screens/HospitalSelectionScreen/HospitalSelectionScreen";
import { DrugSearchScreen } from "../screens/DrugSearchScreen";
import { HospitalDirectoryScreen } from "../screens/HospitalDirectoryScreen";
import { ScheduleScreen } from "../screens/ScheduleScreen";
import { DocumentScannedScreen } from "../screens/DocumentScannedScreen";
import { ConfirmHouseCallScreen } from "../screens/HospitalSelectionScreen/ConfirmHouseCallScreen";
import { ConfirmAppointmentScreen } from "../screens/HospitalSelectionScreen/ConfirmAppointmentScreen";

const MainStack = createStackNavigator();

const MainStackScreen = ({ navigation }) => {
  return (
    <MainStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: THEME.MAIN_COLOR,
        },
        headerTintColor: "#fff",
      }}
    >
      <MainStack.Screen
        name="Main"
        component={MainScreen}
        options={({ navigation }) => ({
          headerTitle: "Главная",
        })}
      />

      <MainStack.Screen
        name="Appointment"
        options={({ navigation }) => ({
          headerTitle: "Запись на прием",
          headerLeft: () => (
            <TouchableOpacity
              style={{ padding: 10 }}
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Ionicons name="ios-arrow-back-outline" size={24} color="white" />
            </TouchableOpacity>
          ),
        })}
      >
        {(props) => (
          <HospitalSelectionScreen
            navigateTo="ConfirmAppointmentScreen"
            {...props}
          />
        )}
      </MainStack.Screen>

      <MainStack.Screen
        name="HouseCallScreen"
        options={({ navigation }) => ({
          headerTitle: "Вызов врача на дом",
          headerLeft: () => (
            <TouchableOpacity
              style={{ padding: 10 }}
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Ionicons name="ios-arrow-back-outline" size={24} color="white" />
            </TouchableOpacity>
          ),
        })}
      >
        {(props) => (
          <HospitalSelectionScreen
            navigateTo="ConfirmHouseCallScreen"
            {...props}
          />
        )}
      </MainStack.Screen>

      <MainStack.Screen
        name="ConfirmHouseCallScreen"
        component={ConfirmHouseCallScreen}
        options={({ navigation }) => ({
          headerTitle: "Вызов врача на дом",
          headerLeft: () => (
            <TouchableOpacity
              style={{ padding: 10 }}
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Ionicons name="ios-arrow-back-outline" size={24} color="white" />
            </TouchableOpacity>
          ),
        })}
      />

      <MainStack.Screen
        name="ConfirmAppointmentScreen"
        component={ConfirmAppointmentScreen}
        options={({ navigation }) => ({
          headerTitle: "Запись на прием",
          headerLeft: () => (
            <TouchableOpacity
              style={{ padding: 10 }}
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Ionicons name="ios-arrow-back-outline" size={24} color="white" />
            </TouchableOpacity>
          ),
        })}
      />

      <MainStack.Screen
        name="DrugSearchScreen"
        component={DrugSearchScreen}
        options={({ navigation }) => ({
          headerTitle: "Поиск лекарств",
          headerLeft: () => (
            <TouchableOpacity
              style={{ padding: 10 }}
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Ionicons name="ios-arrow-back-outline" size={24} color="white" />
            </TouchableOpacity>
          ),
        })}
      />

      <MainStack.Screen
        name="HospitalDirectoryScreen"
        component={HospitalDirectoryScreen}
        options={({ navigation }) => ({
          headerTitle: "Справочник мед. организаций",
          headerLeft: () => (
            <TouchableOpacity
              style={{ padding: 10 }}
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Ionicons name="ios-arrow-back-outline" size={24} color="white" />
            </TouchableOpacity>
          ),
        })}
      />

      <MainStack.Screen
        name="ScheduleScreen"
        component={ScheduleScreen}
        options={({ navigation }) => ({
          headerTitle: "График работы врачей",
          headerLeft: () => (
            <TouchableOpacity
              style={{ padding: 10 }}
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Ionicons name="ios-arrow-back-outline" size={24} color="white" />
            </TouchableOpacity>
          ),
        })}
      />

      <MainStack.Screen
        name="DocumentScannedScreen"
        component={DocumentScannedScreen}
        options={({ navigation }) => ({
          headerTitle: "Проверка мед. документа",
          headerLeft: () => (
            <TouchableOpacity
              style={{ padding: 10 }}
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Ionicons name="ios-arrow-back-outline" size={24} color="white" />
            </TouchableOpacity>
          ),
        })}
      />
    </MainStack.Navigator>
  );
};

const ProfileStack = createStackNavigator();

const ProfileStackScreen = ({ navigation }) => {
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
              style={{ padding: 10 }}
              onPress={() => {
                navigation.navigate("Main");
                // сброс состояния
                // navigation.dispatch(
                //   CommonActions.reset({
                //     index: 1,
                //     routes: [
                //       {
                //         name: "Main",
                //       },
                //     ],
                //   })
                // );
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

const NotificationStackScreen = ({ navigation }) => {
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
        options={({ navigation }) => ({
          headerTitle: "Уведомления",
          headerLeft: () => (
            <TouchableOpacity
              style={{ padding: 10 }}
              onPress={() => {
                navigation.navigate("Main");
              }}
            >
              <Ionicons name="ios-arrow-back-outline" size={24} color="white" />
            </TouchableOpacity>
          ),
        })}
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
