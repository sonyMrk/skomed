import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { HistoryAppointmentsScreen } from "../../screens/HistoryAppointmentsScreen";
import { HeaderGoBackIcon } from "../../components/HeaderGoBackIcon";

const HistoryStack = createStackNavigator();

export const HistoryStackScreen = ({ navigation }) => {
  const handlePressGoBack = () => {
    navigation.navigate("Main");
  };
  return (
    <HistoryStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#fff",
        },
        title: "История",
        headerTintColor: "#000",
      }}
    >
      <HistoryStack.Screen
        name="HistoryAppointments"
        component={HistoryAppointmentsScreen}
        options={({ navigation }) => ({
          headerTitle: "История записей",
          headerLeft: () => <HeaderGoBackIcon onPress={handlePressGoBack} />,
        })}
      />
    </HistoryStack.Navigator>
  );
};
