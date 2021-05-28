import React from "react";

import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import { AppText } from "../../../components/ui/AppText";
import { THEME } from "../../../theme";

const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  "window"
);

export const Stepper = ({ step, onPressOne, onPressTwo, onPressThree }) => {
  return (
    <View style={styles.stepper}>
      <View style={styles.stepper__item}>
        <TouchableOpacity
          style={{
            ...styles.stepper__circle,
            backgroundColor: step >= 1 ? THEME.MAIN_COLOR : THEME.GRAY_COLOR,
          }}
          onPress={onPressOne}
        >
          {step > 1 ? (
            <Image
              source={require("../../../../assets/icons/check.png")}
              style={styles.stepper__check}
            />
          ) : (
            <AppText style={styles.stepper__number}>1</AppText>
          )}
        </TouchableOpacity>
        <View
          style={{
            ...styles.stepper__line,
            backgroundColor: step >= 1 ? THEME.MAIN_COLOR : THEME.GRAY_COLOR,
          }}
        />
      </View>

      <View style={{ ...styles.stepper__item, flex: 1.5 }}>
        <View
          style={{
            ...styles.stepper__line,
            backgroundColor: step >= 2 ? THEME.MAIN_COLOR : THEME.GRAY_COLOR,
          }}
        />
        <TouchableOpacity
          style={{
            ...styles.stepper__circle,
            backgroundColor: step >= 2 ? THEME.MAIN_COLOR : THEME.GRAY_COLOR,
          }}
          onPress={onPressTwo}
        >
          {step > 2 ? (
            <Image
              source={require("../../../../assets/icons/check.png")}
              style={styles.stepper__check}
            />
          ) : (
            <AppText style={styles.stepper__number}>2</AppText>
          )}
        </TouchableOpacity>
        <View
          style={{
            ...styles.stepper__line,
            backgroundColor: step >= 2 ? THEME.MAIN_COLOR : THEME.GRAY_COLOR,
          }}
        />
      </View>

      <View style={styles.stepper__item}>
        <View
          style={{
            ...styles.stepper__line,
            backgroundColor: step >= 3 ? THEME.MAIN_COLOR : THEME.GRAY_COLOR,
          }}
        />
        <TouchableOpacity
          style={{
            ...styles.stepper__circle,
            backgroundColor: step >= 3 ? THEME.MAIN_COLOR : THEME.GRAY_COLOR,
          }}
          onPress={onPressThree}
        >
          {step > 3 ? (
            <Image
              source={require("../../../../assets/icons/check.png")}
              style={styles.stepper__check}
            />
          ) : (
            <AppText style={styles.stepper__number}>3</AppText>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  stepper: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  stepper__item: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    // marginRight: 1,
  },
  stepper__circle: {
    width: viewportHeight / 26,
    height: viewportHeight / 26,
    borderRadius: viewportHeight / 52,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: THEME.GRAY_COLOR,
    marginHorizontal: 2,
  },
  stepper__check: {
    width: viewportHeight / 55,
    height: viewportHeight / 55,
    resizeMode: "contain",
  },
  stepper__line: {
    height: 2,
    flex: 1,
    backgroundColor: THEME.GRAY_COLOR,
  },
  stepper__number: {
    color: "#fff",
  },
});
