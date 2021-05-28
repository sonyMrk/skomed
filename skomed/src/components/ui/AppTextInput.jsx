import React from "react";
import {
  TextInput,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { THEME } from "../../theme";

export const AppTextInput = ({
  placeholder = "",
  style,
  onChange,
  value,
  type = "default",
  autoCapitalize = "none",
  multiline = false,
  numberOfLines = 1,
  textAlign = "left",
  onEndEditing,
  maxLength = 10000,
}) => {
  return (
    <View style={styles.input__wrapper}>
      <TextInput
        style={{ ...styles.input, ...style }}
        onChangeText={onChange}
        value={value}
        placeholder={placeholder}
        keyboardType={type}
        autoCapitalize={autoCapitalize}
        multiline={multiline}
        numberOfLines={numberOfLines}
        textAlign={textAlign}
        onEndEditing={onEndEditing}
        maxLength={maxLength}
      />
      <TouchableOpacity style={styles.remove} onPress={() => onChange("")}>
        <Image
          source={require("../../../assets/icons/remove_text.png")}
          style={styles.remove__icon}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  input__wrapper: {
    backgroundColor: "#fff",
    position: "relative",
    borderBottomColor: THEME.OPACITY_GRAY_COLOR,
    borderBottomColor: 1,
    width: "100%",
  },
  input: {
    height: 40,
    padding: 10,
    width: "100%",
  },
  remove: {
    position: "absolute",
    right: 10,
    top: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: THEME.GRAY_COLOR,
    borderRadius: Dimensions.get("window").width / 40,
    width: Dimensions.get("window").width / 20,
    height: Dimensions.get("window").width / 20,
  },
  remove__icon: {
    resizeMode: "contain",
    width: Dimensions.get("window").width / 40,
    height: Dimensions.get("window").width / 40,
  },
});
