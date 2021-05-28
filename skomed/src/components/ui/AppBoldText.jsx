import React from "react";
import { Text, StyleSheet } from "react-native";

export const AppBoldText = ({ children, style, numberOfLines }) => (
  <Text style={{ ...styles.text, ...style }} numberOfLines={numberOfLines}>
    {children}
  </Text>
);

const styles = StyleSheet.create({
  text: {
    fontFamily: "roboto-bold",
  },
});
