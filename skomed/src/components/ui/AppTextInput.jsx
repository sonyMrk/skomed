import React from "react";
import { TextInput, StyleSheet } from "react-native";
import { THEME } from "../../theme";

export const AppTextInput = ({
  placeholder = "",
  style,
  onChange,
  value,
  type = "default",
  autoCapitalize = "none",
}) => {
  return (
    <TextInput
      style={{ ...styles.input, ...style }}
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
    borderWidth: 1,
    borderColor: THEME.MAIN_COLOR,
    borderRadius: 10,
    padding: 10,
    width: "100%",
  },
});
