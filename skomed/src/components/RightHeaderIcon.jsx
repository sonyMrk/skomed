import React from "react";
import { View, TouchableOpacity, Image, StyleSheet } from "react-native";
import { normalize } from "../utils/normalizeFontSize";

export const RightHeaderIcon = ({ onPress, newNotificationsCount }) => {
  return (
    <View style={styles.wrapper}>
      <TouchableOpacity onPress={onPress} style={styles.opacity}>
        <Image
          style={styles.icon}
          source={require("../../assets/icons/alarm.png")}
        />
        {newNotificationsCount > 0 && <View style={styles.notification} />}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  opacity: {
    marginRight: 10,
    marginLeft: 15,
    position: "relative",
  },
  icon: {
    width: normalize(23),
    height: normalize(23),
    maxWidth: "100%",
  },
  notification: {
    backgroundColor: "#FF0000",
    width: 10,
    height: 10,
    borderRadius: 5,
    position: "absolute",
    right: 0,
  },
});
