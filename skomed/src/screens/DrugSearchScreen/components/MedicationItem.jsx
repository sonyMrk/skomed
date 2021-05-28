import React, { memo } from "react";
import { View, StyleSheet } from "react-native";

import { InfoItem } from "../../../components/ui/InfoItem";
import { THEME } from "../../../theme";

const Item = ({ item }) => {
  return (
    <View style={styles.result__item}>
      <InfoItem title="Адрес" value={item.address} />
      <InfoItem title="Аптека" value={item.apteka} />
      <InfoItem title="Телефон" value={item.phone} />
      <InfoItem title="График работы" value={item.workTime} />
      <InfoItem title="Название лекарства" value={item.name} />
      <InfoItem title="Цена" value={`${item.price} тг`} />
      <InfoItem title="Последнее обновление данных" value={item.updateTime} />
    </View>
  );
};

const styles = StyleSheet.create({
  result__item: {
    marginTop: 20,
    borderColor: THEME.MAIN_COLOR,
    borderWidth: 2,
    borderRadius: 10,
    padding: 15,
    backgroundColor: "#fff",
  },
});

export default MedicationItem = memo(Item);
