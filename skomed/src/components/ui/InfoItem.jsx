import React from "react";
import { StyleSheet, View, Touchable, TouchableOpacity } from "react-native";

import { AppText } from "./AppText";
import { AppBoldText } from "./AppBoldText";
import { THEME } from "../../theme";

export const InfoItem = ({
  title,
  value,
  color = "#000",
  children,
}) => {
  return (
    <View style={styles.item}>
      <View>
        <AppText style={{ color: THEME.GRAY_COLOR }}>{title}</AppText>
      </View>
      {children ? (
        children
      ) : (
        <View>
          <AppBoldText style={{ color: color }}>
            {value ? value : "Не найдено"}
          </AppBoldText>
        </View>
      )}
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
});
