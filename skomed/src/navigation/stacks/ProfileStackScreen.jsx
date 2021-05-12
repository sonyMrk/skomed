import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { THEME } from "../../theme";

import { ProfileScreen } from "../../screens/ProfileScreen";

const ProfileStack = createStackNavigator();

export const ProfileStackScreen = ({ navigation }) => {
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