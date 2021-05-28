import React, { memo } from "react";
import { StyleSheet, View } from "react-native";
import { Marker, Callout } from "react-native-maps";

import newId from "../../../utils/newId";
import { InfoItem } from "../../../components/ui/InfoItem";

export const AppMapMarker = memo(({ item }) => {
  return (
    <Marker
      coordinate={item.coordinate}
      pinColor={"#c68c53"}
      title={"Заголовок"}
      description={`Описание`}
      key={newId()}
      tracksViewChanges={false}
    >
      <Callout tooltip={true}>
        <View style={styles.map__tooltip}>
          <InfoItem
            title="Адрес"
            value={item.address}
            style={styles.tooltip__row}
          />
          <InfoItem
            title="Аптека"
            value={item.apteka}
            style={styles.tooltip__row}
          />
          <InfoItem
            title="Телефон"
            value={item.phone}
            style={styles.tooltip__row}
          />
          <InfoItem title="График работы" value={item.workTime} />
        </View>
      </Callout>
    </Marker>
  );
});

const styles = StyleSheet.create({
  map__tooltip: {
    borderRadius: 10,
    backgroundColor: "#fff",
    padding: 10,
  },
  tooltip__row: {},
});
