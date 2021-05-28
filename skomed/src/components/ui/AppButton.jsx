import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { THEME } from "../../theme";

import { AppText } from "./AppText";

export const AppButton = ({
  children,
  onPress,
  color = THEME.BLUE_COLOR,
  style,
  wrapperStyle = {},
  disabled = false,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.5}
      style={{ ...wrapperStyle }}
    >
      <View
        style={{
          ...styles.button,
          backgroundColor: disabled ? "#80bdff" : color,
          ...style,
        }}
      >
        <AppText style={{ color: "#fff" }}>{children}</AppText>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
});
