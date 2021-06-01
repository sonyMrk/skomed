import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export const HeaderGoBackIcon = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.icon} onPress={onPress}>
      <Ionicons name="ios-arrow-back-outline" size={24} color="black" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  icon: { padding: 10 },
});
