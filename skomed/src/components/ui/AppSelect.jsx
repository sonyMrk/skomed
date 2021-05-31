import RNPickerSelect from "react-native-picker-select";

import React from "react";
import { StyleSheet, Image, Dimensions } from "react-native";
import { normalize } from "../../utils/normalizeFontSize";

export const AppSelect = ({ placeholder, value, onValueChange, data }) => {
  return (
    <RNPickerSelect
      fixAndroidTouchableBug={true}
      placeholder={{
        label: placeholder,
        value: null,
        color: "#000",
      }}
      value={value}
      onValueChange={onValueChange}
      items={data}
      useNativeAndroidPickerStyle={false}
      style={{
        ...pickerSelectStyles,
      }}
      doneText="Выбрать"
      Icon={() => (
        <Image
          source={require("../../../assets/icons/arrow_down.png")}
          style={styles.arrow}
        />
      )}
    />
  );
};

const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  "window"
);

const styles = StyleSheet.create({
  arrow: {
    resizeMode: "contain",
    width: viewportWidth / 20,
    height: viewportWidth / 20,
  },
});

const pickerSelectStyles = StyleSheet.create({
  headlessAndroidContainer: {
    backgroundColor: "#fff",
    paddingVertical: 15,
    paddingLeft: 15,
    justifyContent: "center",
  },
  inputAndroid: {
    color: "#000",
    fontSize: normalize(16),
  },
  inputIOS: {
    color: "#000",
    fontSize: normalize(16),
  },
  iconContainer: {
    padding: 5,
    marginRight: 10,
  },
  placeholder: {
    color: "#000",
    fontSize: normalize(16),
  },
  inputIOSContainer: {
    backgroundColor: "#fff",
    padding: normalize(10),
    justifyContent: "center",
    fontSize: normalize(16),
  },
});
