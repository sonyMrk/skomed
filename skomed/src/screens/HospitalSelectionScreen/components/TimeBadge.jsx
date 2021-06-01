import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Dimensions,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { AppText } from "../../../components/ui/AppText";
import { THEME } from "../../../theme";
import { normalize } from "../../../utils/normalizeFontSize";

const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  "window"
);

export const TimeBadge = ({
  time,
  setAppointmentTime,
  appointmentTimeStart,
}) => {
  const handlePress = () => {
    setAppointmentTime(time.value);
  };

  return (
    <TouchableOpacity
      style={{
        ...styles.times__item,
        backgroundColor:
          time.value.TimeStart === appointmentTimeStart
            ? "#66b0ff"
            : THEME.BLUE_COLOR,
      }}
      onPress={handlePress}
      activeOpacity={0.9}
    >
      <AppText style={styles.item__text}>{time.label}</AppText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  times__item: {
    flexBasis: (viewportWidth / 6) * 0.9,
    marginRight: 8,
    marginTop: 15,
    backgroundColor: THEME.BLUE_COLOR,
    padding: 8,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  item__text: { color: "#fff", fontSize: normalize(12) },
});
