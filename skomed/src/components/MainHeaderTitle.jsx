import React from "react";
import { View, Dimensions, Image, StyleSheet } from "react-native";
import { normalize } from "../utils/normalizeFontSize";
import { AppBoldText } from "./ui/AppBoldText";

export const MainHeaderTitle = ({}) => {
  return (
    <View style={styles.wrapper}>
      <Image
        source={require("../../assets/icons/title__icon.png")}
        style={styles.icon}
      />
      <AppBoldText style={styles.text} numberOfLines={1}>
        SKOmed
      </AppBoldText>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
  },
  icon: {
    resizeMode: "contain",
    width: Dimensions.get("window").width / 10,
    height: Dimensions.get("window").width / 10,
  },
  text: { fontSize: normalize(27), marginLeft: 5 },
});
