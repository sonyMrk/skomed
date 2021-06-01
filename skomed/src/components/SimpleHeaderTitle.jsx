import React from "react";
import { View, Image, StyleSheet, Dimensions } from "react-native";
import { normalize } from "../utils/normalizeFontSize";
import { AppBoldText } from "./ui/AppBoldText";

export const SimpleHeaderTitle = ({ title }) => {
  return (
    <View style={styles.wrapper}>
      <Image
        source={require("../../assets/icons/title__icon.png")}
        style={styles.icon}
      />
      <AppBoldText style={styles.text} numberOfLines={1}>
        {title}
      </AppBoldText>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: { flexDirection: "row", alignItems: "center" },
  icon: {
    resizeMode: "contain",
    width: Dimensions.get("window").width / 15,
    height: Dimensions.get("window").width / 15,
  },
  text: { fontSize: normalize(16), marginLeft: 5 },
});
