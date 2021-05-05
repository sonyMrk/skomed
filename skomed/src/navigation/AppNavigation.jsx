import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, CommonActions } from "@react-navigation/native";

import { useSelector } from "react-redux";

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
import { Preloader } from "../components/ui/Preloader";
import { useDispatch } from "react-redux";
import { loadUserProfile } from "../store/actions/user";
import { SupportedHospitals } from "../screens/SupportedHospitals";
import { RegistrationForVaccination } from "../screens/RegistrationForVaccination/RegistrationForVaccination";
import { ConfirtmRegForVaccination } from "../screens/RegistrationForVaccination/ConfirtmRegForVaccination";
import { WorkEvaluation } from "../screens/WorkEvaluation";
import { getInitAppState, getAppNotificationsState } from "../store/selectors/app";

const getDefaultScreenOptions = (title) => ({ navigation }) => ({
  headerTitle: title,
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
})

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
        options={{
          headerTitle: "Главная",
        }}
      />

      <MainStack.Screen
        name="Appointment"
        options={getDefaultScreenOptions("Запись на прием")}
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
        options={getDefaultScreenOptions("Вызов врача на дом")}
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
        options={getDefaultScreenOptions("Вызов врача на дом")}
      />

      <MainStack.Screen
        name="ConfirmAppointmentScreen"
        component={ConfirmAppointmentScreen}
        options={getDefaultScreenOptions("Запись на прием")}
      />

      <MainStack.Screen
        name="SupportedHospitals"
        component={SupportedHospitals}
        options={getDefaultScreenOptions("Список доступных организций")}
      />

      <MainStack.Screen
        name="DrugSearchScreen"
        component={DrugSearchScreen}
        options={getDefaultScreenOptions("Поиск лекарств")}
      />

      <MainStack.Screen
        name="HospitalDirectoryScreen"
        component={HospitalDirectoryScreen}
        options={getDefaultScreenOptions("Справочник мед. организаций")}
      />

      <MainStack.Screen
        name="ScheduleScreen"
        component={ScheduleScreen}
        options={getDefaultScreenOptions("График работы врачей")}
      />

      <MainStack.Screen
        name="DocumentScannedScreen"
        component={DocumentScannedScreen}
        options={getDefaultScreenOptions("Проверка мед. документа")}
      />

      <MainStack.Screen
        name="RegistrationForVaccination"
        component={RegistrationForVaccination}
        options={getDefaultScreenOptions("Записаться на вакцинацую")}
      />

      <MainStack.Screen
        name="ConfirtmRegForVaccination"
        component={ConfirtmRegForVaccination}
        options={getDefaultScreenOptions("Записаться на вакцинацую")}
      />

      <MainStack.Screen
        name="WorkEvaluation"
        component={WorkEvaluation}
        options={getDefaultScreenOptions("Оценка работы врача")}
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
  const isInit = useSelector(getInitAppState);
  const notifications = useSelector(getAppNotificationsState);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUserProfile());
  });

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
          name="Notification"
          component={NotificationStackScreen}
          options={{
            tabBarLabel: "Уведомления",
            tabBarBadge: notifications?.length,
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
