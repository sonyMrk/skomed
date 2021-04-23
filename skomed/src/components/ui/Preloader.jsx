import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { THEME } from "../../theme";

export const Preloader = ({ color=THEME.MAIN_COLOR, size="large" }) => (
  <View style={styles.preloader}>
    <ActivityIndicator size={size} color={color} />
  </View>
);

const styles = StyleSheet.create({
  preloader: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
