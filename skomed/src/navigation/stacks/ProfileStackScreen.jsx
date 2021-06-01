import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { ProfileScreen } from "../../screens/ProfileScreen";
import { HeaderGoBackIcon } from "../../components/HeaderGoBackIcon";

const ProfileStack = createStackNavigator();

export const ProfileStackScreen = ({ navigation }) => {
  const handlePressGoBack = () => {
    navigation.navigate("Main");
  };
  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#fff",
        },
        title: "Профиль",
        headerTintColor: "#000",
      }}
    >
      <ProfileStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={({ navigation }) => ({
          headerTitle: "Профиль",
          headerLeft: () => <HeaderGoBackIcon onPress={handlePressGoBack} />,
        })}
      />
    </ProfileStack.Navigator>
  );
};
