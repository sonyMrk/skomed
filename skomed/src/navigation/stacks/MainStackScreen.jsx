import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { TouchableOpacity, View, Dimensions, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { HospitalSelectionScreen } from "../../screens/HospitalSelectionScreen/HospitalSelectionScreen";
import { DrugSearchScreen } from "../../screens/DrugSearchScreen/DrugSearchScreen";
import { HospitalDirectoryScreen } from "../../screens/HospitalDirectoryScreen";
import { ScheduleScreen } from "../../screens/ScheduleScreen";
import { DocumentScannedScreen } from "../../screens/DocumentScannedScreen";
import { ConfirmHouseCallScreen } from "../../screens/HospitalSelectionScreen/ConfirmHouseCallScreen";
import { ConfirmAppointmentScreen } from "../../screens/HospitalSelectionScreen/ConfirmAppointmentScreen";
import { SupportedHospitals } from "../../screens/SupportedHospitals";
import { RegistrationForVaccination } from "../../screens/RegistrationForVaccination/RegistrationForVaccination";
import { ConfirtmRegForVaccination } from "../../screens/RegistrationForVaccination/ConfirtmRegForVaccination";
import { WorkEvaluation } from "../../screens/WorkEvaluation";

import { MainScreen } from "../../screens/MainScreen/MainScreen";
import { useSelector } from "react-redux";
import { NotificationScreen } from "../../screens/NotificationScreen";
import { getNewNotificationsCountState } from "../../store/selectors/app";
import { normalize } from "../../utils/normalizeFontSize";
import { AppointmentFamilyDoctorScreen } from "../../screens/HospitalSelectionScreen/AppointmentFamilyDoctorScreen";
import { AppText } from "../../components/ui/AppText";
import { AppBoldText } from "../../components/ui/AppBoldText";

const getDefaultScreenOptions = (title) => ({ navigation }) => ({
  headerTitle: () => (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Image
        source={require("../../../assets/icons/title__icon.png")}
        style={{
          resizeMode: "contain",
          width: Dimensions.get("window").width / 15,
          height: Dimensions.get("window").width / 15,
        }}
      />
      <AppBoldText
        style={{ fontSize: normalize(16), marginLeft: 5 }}
        numberOfLines={1}
      >
        {title}
      </AppBoldText>
    </View>
  ),
  headerTitleStyle: {
    fontSize: normalize(15),
  },
  headerStyle: {
    backgroundColor: "#fff",
  },
  headerTintColor: "#000",
  headerLeft: () => (
    <TouchableOpacity
      style={{ padding: 10 }}
      onPress={() => {
        navigation.goBack();
      }}
    >
      <Ionicons name="ios-arrow-back-outline" size={24} color="#000" />
    </TouchableOpacity>
  ),
});

const MainStack = createStackNavigator();

export const MainStackScreen = ({ navigation }) => {
  const newNotificationsCount = useSelector(getNewNotificationsCountState);

  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name="Main"
        component={MainScreen}
        options={{
          headerTitle: "SKOmed",
          headerStyle: {
            height: Dimensions.get("window").width / 4.4,
          },
          headerTitleStyle: {
            marginBottom: 5,
            fontWeight: "bold",
            fontSize: 27,
          },
          headerRight: () => {
            return (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Notification");
                  }}
                  style={{
                    marginRight: 10,
                    marginLeft: 15,
                    position: "relative",
                  }}
                >
                  <Image
                    style={{
                      width: normalize(23),
                      height: normalize(23),
                      maxWidth: "100%",
                    }}
                    source={require("../../../assets/icons/alarm.png")}
                  />
                  {newNotificationsCount > 0 && (
                    <View
                      style={{
                        backgroundColor: "#FF0000",
                        width: 10,
                        height: 10,
                        borderRadius: 5,
                        position: "absolute",
                        right: 0,
                      }}
                    />
                  )}
                </TouchableOpacity>
              </View>
            );
          },
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
      <MainStack.Screen
        name="Notification"
        component={NotificationScreen}
        options={getDefaultScreenOptions("Уведомления")}
      />
      <MainStack.Screen
        name="AppointmentFamilyDoctor"
        component={AppointmentFamilyDoctorScreen}
        options={getDefaultScreenOptions("Запись к участковому врачу")}
      />
    </MainStack.Navigator>
  );
};
