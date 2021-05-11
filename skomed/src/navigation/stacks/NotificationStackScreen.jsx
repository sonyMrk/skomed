import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { NotificationScreen } from "../../screens/NotificationScreen";
import { THEME } from "../../theme";

const NotificationStack = createStackNavigator();

export const NotificationStackScreen = ({ navigation }) => {
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
