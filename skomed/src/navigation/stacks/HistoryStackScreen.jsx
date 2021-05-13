import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { THEME } from "../../theme";

import { ProfileScreen } from "../../screens/ProfileScreen";
import { HistoryAppointmentsScreen } from "../../screens/HistoryAppointmentsScreen";

const ProfileStack = createStackNavigator();

export const HistoryStackScreen = ({ navigation }) => {
  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: THEME.MAIN_COLOR,
        },
        title: "История",
        headerTintColor: "#fff",
      }}
    >
      <ProfileStack.Screen
        name="HistoryAppointments"
        component={HistoryAppointmentsScreen}
        options={({ navigation }) => ({
          headerTitle: "История записей",
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
