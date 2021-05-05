import React from "react";
import { View, TouchableOpacity, Dimensions, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { AppBoldText } from "./ui/AppBoldText";
import { THEME } from "../theme";

export const MenuItem = ({ title, icon, navigateTo, style, onPress }) => {
  const handlePress = () => {
    onPress(navigateTo);
  };

  return (
    <View style={{ ...styles.item, ...style }}>
      <TouchableOpacity style={styles.opacity} onPress={handlePress}>
          {icon && (
            <View style={styles.icon}>
              <Ionicons name={icon} size={50} color={THEME.MAIN_COLOR} />
            </View>
          )}
          <View style={styles.title}>
            <AppBoldText style={styles.text}>{title}</AppBoldText>
          </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flexGrow: 0,
    width: Dimensions.get("window").width / 3,
    height: Dimensions.get("window").width / 3,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    borderColor: THEME.MAIN_COLOR,
    borderWidth: 2,
    borderRadius: 10,
    alignContent: "center",
    justifyContent: "center",
    shadowColor: "#000",
    backgroundColor: "#f2f2f2",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  opacity: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 24,
    paddingHorizontal: 10,
  },
  icon: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    flex: 1,
    padding: 10,
  },
  text: {
    textAlign: "center",
  },
});
