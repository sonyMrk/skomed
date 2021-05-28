import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { useDispatch } from "react-redux";

import { THEME } from "../../../theme";
import newId from "../../../utils/newId";
import { AppButton } from "../../../components/ui/AppButton";
import { AppText } from "../../../components/ui/AppText";
import {
  clearMedicationsError,
  clearMedicationsList,
} from "../../../store/actions/medications";
import MedicationItem from "./MedicationItem";

export const MedicationResulList = ({
  medicationsList,
  mapLoading,
  onSelectMap,
}) => {
  const dispatch = useDispatch();

  const handleReset = () => {
    dispatch(clearMedicationsError());
    dispatch(clearMedicationsList());
    // setMedicationName("");
    // setPharmacy(null);
    // setDistrict(null);
  };

  const handleWatchOnMap = () => {
    onSelectMap();
  };

  return (
    <ScrollView>
      <View style={styles.result__list}>
        <AppButton onPress={handleReset}>Удалить результат поиска</AppButton>
        {medicationsList.length == 0 ? (
          <AppText style={styles.result__text}>
            По вашему запросу результатов не найдено
          </AppText>
        ) : (
          <AppText
            style={{
              ...styles.result__text,
              color: THEME.DANGER_COLOR,
            }}
          >
            Пожалуйста, уточняйте цену и наличие лекарств в аптеках!
          </AppText>
        )}
        <AppButton onPress={handleWatchOnMap} disabled={mapLoading}>
          {mapLoading ? "Идет загрузка карты..." : "Посмотреть на карте"}
        </AppButton>
        {medicationsList &&
          medicationsList.map((item) => {
            return <MedicationItem item={item} key={newId()} />;
          })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  result__text: {
    textAlign: "center",
    marginVertical: 20,
  },
  result__list: {
    padding: 15,
  },
});
