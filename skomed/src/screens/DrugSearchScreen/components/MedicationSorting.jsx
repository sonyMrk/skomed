import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { THEME } from "../../../theme";
import { AppText } from "../../../components/ui/AppText";
import { normalize } from "../../../utils/normalizeFontSize";

export const MedicationSorting = ({ sortBy, setSortBy }) => {
  return (
    <View style={styles.sorting}>
      <AppText>Фильтровать по:</AppText>
      <View style={styles.sorting__items}>
        <TouchableOpacity
          style={{
            ...styles.sorting__item,
            backgroundColor:
              sortBy.field === "name" ? THEME.MAIN_COLOR : "transparent",
          }}
          onPress={() => {
            setSortBy({ field: "name", reverse: !sortBy.reverse });
          }}
        >
          <AppText style={{ color: sortBy.field === "name" ? "#fff" : "#000" }}>
            названию
          </AppText>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            ...styles.sorting__item,
            backgroundColor:
              sortBy.field === "price" ? THEME.MAIN_COLOR : "transparent",
          }}
          onPress={() => {
            setSortBy({ field: "price", reverse: !sortBy.reverse });
          }}
        >
          <AppText
            style={{ color: sortBy.field === "price" ? "#fff" : "#000" }}
          >
            цене
          </AppText>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            ...styles.sorting__item,
            backgroundColor:
              sortBy.field === "apteka" ? THEME.MAIN_COLOR : "transparent",
          }}
          onPress={() => {
            setSortBy({ field: "apteka", reverse: !sortBy.reverse });
          }}
        >
          <AppText
            style={{ color: sortBy.field === "apteka" ? "#fff" : "#000" }}
          >
            аптекам
          </AppText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sorting: {
    paddingVertical: normalize(15),
    alignItems: "center",
    justifyContent: "space-between",
  },
  sorting__items: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: normalize(5),
  },
  sorting__item: {
    alignItems: "center",
    justifyContent: "center",
    marginLeft: normalize(10),
    padding: normalize(10),
    borderWidth: 1,
    borderColor: THEME.MAIN_COLOR,
    borderRadius: 10,
  },
});
