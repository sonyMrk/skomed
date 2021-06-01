import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { NotificationScreen } from "../../screens/NotificationScreen";
import { HeaderGoBackIcon } from "../../components/HeaderGoBackIcon";

const NotificationStack = createStackNavigator();

export const NotificationStackScreen = ({ navigation }) => {
  const handlePressGoBack = () => {
    navigation.navigate("Main");
  };

  return (
    <NotificationStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#fff",
        },
        title: "Уведомления",
        headerTintColor: "#000",
      }}
    >
      <NotificationStack.Screen
        name="Notification"
        component={NotificationScreen}
        options={({ navigation }) => ({
          headerTitle: "Уведомления",
          headerLeft: () => <HeaderGoBackIcon onPress={handlePressGoBack} />,
        })}
      />
    </NotificationStack.Navigator>
  );
};
