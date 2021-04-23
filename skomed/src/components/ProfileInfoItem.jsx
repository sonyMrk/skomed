import React from "react";
import { StyleSheet, View } from "react-native";

import { AppText } from "./ui/AppText";
import { THEME } from "../theme";
import { AppBoldText } from "./ui/AppBoldText";

export const ProfileInfoItem = ({ title, value }) => {
  return (
    <View style={styles.item}>
      <View>
        <AppText style={{ color: THEME.GRAY_COLOR }}>
          {title}
        </AppText>
      </View>
      <View>
        <AppBoldText>
          {value}
        </AppBoldText>
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
  }
});
