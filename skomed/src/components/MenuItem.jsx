import React from "react";
import {
  View,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Image,
} from "react-native";

import { AppText } from "./ui/AppText";
import { normalize } from "../utils/normalizeFontSize";

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
          <View>
            <Image
              source={require("../../assets/icons/arrow.png")}
              style={styles.arrow}
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
    padding: Dimensions.get("window").width / 45,
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
    fontSize: normalize(13),
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
  },
  arrow: {
    width: Dimensions.get("window").width / 25,
    height: Dimensions.get("window").width / 25,
    maxWidth: "100%",
  },
});
