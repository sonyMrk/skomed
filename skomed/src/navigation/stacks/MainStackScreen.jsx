import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { TouchableOpacity, View, Dimensions, Image } from "react-native";
import { useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

import { DrugSearchScreen } from "../../screens/DrugSearchScreen/DrugSearchScreen";
import { HospitalDirectoryScreen } from "../../screens/HospitalDirectoryScreen";
import { ScheduleScreen } from "../../screens/ScheduleScreen";
import { DocumentScannedScreen } from "../../screens/DocumentScannedScreen";
import { SupportedHospitals } from "../../screens/SupportedHospitals";
import { WorkEvaluation } from "../../screens/WorkEvaluation";
import { MainScreen } from "../../screens/MainScreen/MainScreen";
import { NotificationScreen } from "../../screens/NotificationScreen";
import { getNewNotificationsCountState } from "../../store/selectors/app";
import { normalize } from "../../utils/normalizeFontSize";
import { AppointmentFamilyDoctorScreen } from "../../screens/HospitalSelectionScreen/AppointmentFamilyDoctorScreen";
import { AppointmentProfileSpecialists } from "../../screens/HospitalSelectionScreen/AppointmentProfileSpecialists";
import { AppBoldText } from "../../components/ui/AppBoldText";
import { PaidDoctorAppointment } from "../../screens/HospitalSelectionScreen/PaidDoctorAppointment";
import { RegistrationForVaccination } from "../../screens/HospitalSelectionScreen/RegistrationForVaccination";
import { RightHeaderIcon } from "../../components/RightHeaderIcon";
import { MainHeaderTitle } from "../../components/MainHeaderTitle";
import { SimpleHeaderTitle } from "../../components/SimpleHeaderTitle";
import { HeaderGoBackIcon } from "../../components/HeaderGoBackIcon";

const getDefaultScreenOptions =
  (title) =>
  ({ navigation }) => ({
    headerTitle: () => <SimpleHeaderTitle title={title} />,
    headerTitleStyle: {
      fontSize: normalize(15),
      alignSelf: "center",
    },
    headerStyle: {
      backgroundColor: "#fff",
    },
    headerTintColor: "#000",
    headerLeft: () => (
      <HeaderGoBackIcon
        onPress={() => {
          navigation.goBack();
        }}
      />
    ),
  });

const MainStack = createStackNavigator();

export const MainStackScreen = ({ navigation }) => {
  const newNotificationsCount = useSelector(getNewNotificationsCountState);

  const handlePressNotificationIcon = () => {
    navigation.navigate("Notification");
  };

  return (
    <MainStack.Navigator
      screenOptions={{ headerTitleAlign: "center", gestureEnabled: false }}
    >
      <MainStack.Screen
        name="Main"
        component={MainScreen}
        options={{
          headerTitleAlign: "left",
          headerTitle: () => <MainHeaderTitle />,
          headerStyle: {
            height: Dimensions.get("window").width / 4.4,
          },
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerRight: () => {
            return (
              <RightHeaderIcon
                onPress={handlePressNotificationIcon}
                newNotificationsCount={newNotificationsCount}
              />
            );
          },
        }}
      />

      <MainStack.Screen
        name="SupportedHospitals"
        component={SupportedHospitals}
        options={getDefaultScreenOptions("???????????? ?????????????????? ????????????????????")}
      />

      <MainStack.Screen
        name="DrugSearchScreen"
        component={DrugSearchScreen}
        options={getDefaultScreenOptions("?????????? ????????????????")}
      />

      <MainStack.Screen
        name="HospitalDirectoryScreen"
        component={HospitalDirectoryScreen}
        options={getDefaultScreenOptions("???????????????????? ??????. ??????????????????????")}
      />

      <MainStack.Screen
        name="ScheduleScreen"
        component={ScheduleScreen}
        options={getDefaultScreenOptions("???????????? ???????????? ????????????")}
      />

      <MainStack.Screen
        name="DocumentScannedScreen"
        component={DocumentScannedScreen}
        options={getDefaultScreenOptions("???????????????? ??????. ??????????????????")}
      />

      <MainStack.Screen
        name="RegistrationForVaccination"
        component={RegistrationForVaccination}
        options={getDefaultScreenOptions("???????????????????? ???? ????????????????????")}
      />

      <MainStack.Screen
        name="WorkEvaluation"
        component={WorkEvaluation}
        options={getDefaultScreenOptions("???????????? ???????????? ??????????")}
      />
      <MainStack.Screen
        name="Notification"
        component={NotificationScreen}
        options={getDefaultScreenOptions("??????????????????????")}
      />
      <MainStack.Screen
        name="AppointmentFamilyDoctor"
        component={AppointmentFamilyDoctorScreen}
        options={getDefaultScreenOptions("???????????? ???? ??????????")}
      />
      <MainStack.Screen
        name="AppointmentProfileSpecialists"
        component={AppointmentProfileSpecialists}
        options={getDefaultScreenOptions("???????????? ???? ??????????")}
      />
      <MainStack.Screen
        name="PaidDoctorAppointment"
        component={PaidDoctorAppointment}
        options={getDefaultScreenOptions("???????????? ???? ??????????")}
      />
    </MainStack.Navigator>
  );
};
