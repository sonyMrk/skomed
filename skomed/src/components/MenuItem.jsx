import React from "react";
import { View, TouchableOpacity, Dimensions, StyleSheet } from "react-native";

import { AppText } from "./ui/AppText";
import { THEME } from "../theme";

import ArrowIcon from "../../assets/icons/arrow.svg";

export const MenuItem = ({ title, navigateTo, style, onPress, children }) => {
  const handlePress = () => {
    onPress(navigateTo);
  };

  return (
    <View style={{ ...styles.item, ...style }}>
      <TouchableOpacity style={styles.opacity} onPress={handlePress}>
        <View style={styles.row}>
          <View style={styles.left}>
            {children}
            <View style={styles.title}>
              <AppText style={styles.text}>{title}</AppText>
            </View>
          </View>
          <View style={styles.arrow}>
            <ArrowIcon
              width={Dimensions.get("screen").width / 20}
              height={Dimensions.get("screen").width / 20}
            />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#fff",
    padding: 10,
    borderColor: "#D1D1D6",
    borderBottomWidth: 1,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    marginLeft: 10,
  },
  text: {
    fontSize: 17,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
  },
  arrow: {},
});
