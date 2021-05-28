import React from "react";

import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import { AppText } from "../../../components/ui/AppText";
import { THEME } from "../../../theme";
import { normalize } from "../../../utils/normalizeFontSize";

const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  "window"
);

export const PeopleItem = ({ item, onPress }) => {
  const handleOnPress = () => {
    onPress(item.value);
  };

  return (
    <TouchableOpacity onPress={handleOnPress}>
      <View style={styles.item}>
        <AppText style={styles.name}>{item.label}</AppText>
        <Image
          source={require("../../../../assets/icons/arrow.png")}
          style={styles.arrow}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: THEME.GRAY_COLOR,
    paddingVertical: normalize(12),
  },
  name: {},
  arrow: {
    width: viewportWidth / 15,
    height: viewportWidth / 15,
    resizeMode: "contain",
  },
});
