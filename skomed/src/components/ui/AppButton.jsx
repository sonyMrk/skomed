import React from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Platform,
  TouchableNativeFeedback,
} from "react-native";
import { THEME } from "../../theme";

import { AppText } from "./AppText";

export const AppButton = ({
  children,
  onPress,
  color = THEME.MAIN_COLOR,
  style,
}) => {
  const Wrapper =
    Platform.OS === "android" ? TouchableNativeFeedback : TouchableOpacity;
  return (
    <Wrapper onPress={onPress}>
      <View style={{ ...styles.button, backgroundColor: color, ...style }}>
        <AppText style={{ color: "#fff" }}>{children}</AppText>
      </View>
    </Wrapper>
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
