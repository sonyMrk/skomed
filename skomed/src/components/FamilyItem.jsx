import React from "react";
import { StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { AppButton } from "./ui/AppButton";
import { THEME } from "../theme";
import { AppBoldText } from "./ui/AppBoldText";

export const FamilyItem = ({ label, iin, id, onDelete, onEdit }) => {
  const handlePressDel = () => {
    onDelete(id);
  };

  const handlePressEdit = () => {
    onEdit(id);
  };

  return (
    <View style={styles.item}>
      <View style={styles.family__row}>
        <AppBoldText>{label}</AppBoldText>
        <View style={styles.family__actions}>
          <View>
            <AppButton style={styles.btn} onPress={handlePressEdit}>
              <Ionicons name="pencil" size={14} color="#fff" />
            </AppButton>
          </View>
          <View>
            <AppButton
              style={styles.btn}
              color={THEME.DANGER_COLOR}
              onPress={handlePressDel}
            >
              <Ionicons name="trash" size={14} color="#fff" />
            </AppButton>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    width: "100%",
    borderColor: THEME.GRAY_COLOR,
    borderBottomWidth: 1,
    paddingVertical: 10,
  },
  family__actions: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flexBasis: 80,
  },
  family__row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  btn: {
    borderRadius: 50,
    paddingHorizontal: 10,
  },
});
