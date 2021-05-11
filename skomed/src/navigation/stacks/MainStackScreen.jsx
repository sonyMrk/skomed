import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { HospitalSelectionScreen } from "../../screens/HospitalSelectionScreen/HospitalSelectionScreen";
import { DrugSearchScreen } from "../../screens/DrugSearchScreen";
import { HospitalDirectoryScreen } from "../../screens/HospitalDirectoryScreen";
import { ScheduleScreen } from "../../screens/ScheduleScreen";
import { DocumentScannedScreen } from "../../screens/DocumentScannedScreen";
import { ConfirmHouseCallScreen } from "../../screens/HospitalSelectionScreen/ConfirmHouseCallScreen";
import { ConfirmAppointmentScreen } from "../../screens/HospitalSelectionScreen/ConfirmAppointmentScreen";
import { SupportedHospitals } from "../../screens/SupportedHospitals";
import { RegistrationForVaccination } from "../../screens/RegistrationForVaccination/RegistrationForVaccination";
import { ConfirtmRegForVaccination } from "../../screens/RegistrationForVaccination/ConfirtmRegForVaccination";
import { WorkEvaluation } from "../../screens/WorkEvaluation";

import { THEME } from "../../theme";
import { MainScreen } from "./../../screens/MainScreen";

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
});

const MainStack = createStackNavigator();

export const MainStackScreen = ({ navigation }) => {
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
