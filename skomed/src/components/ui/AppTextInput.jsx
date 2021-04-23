import React from "react";
import { TextInput, StyleSheet } from "react-native";

export const AppTextInput = ({ placeholder="", style, onChange, value, type="default", autoCapitalize="none" }) => {
  return (
    <TextInput
      style={{...styles.input, ...style}}
      onChangeText={onChange}
      value={value}
      placeholder={placeholder}
      keyboardType={type}
      autoCapitalize={autoCapitalize}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    width: "100%",
  },
});
