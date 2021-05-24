import React from "react";
import { StyleSheet, View } from "react-native";
import { AppText } from "../components/ui/AppText";
import { AppButton } from "../components/ui/AppButton";
import { useDispatch } from "react-redux";
import { getListOfMedications } from "../services/medicationsApi";

export const DrugSearchScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const handleSearch = () => {
    getListOfMedications("Парацетамол");
  };
  return (
    <View style={styles.container}>
      <AppButton onPress={handleSearch}>Получить список</AppButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
