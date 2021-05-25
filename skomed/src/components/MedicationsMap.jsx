import React, { useRef } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from "react-native-maps";

import newId from "../utils/newId";
import { THEME } from "../theme";
import { InfoItem } from "../components/ui/InfoItem";

export const MedicationsMap = ({ medicationsList }) => {
  const mapRef = useRef(null);

  return (
    <View style={styles.map__wrapper}>
      <MapView
        style={styles.map}
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        onLayout={() => {
          mapRef.current.fitToElements(true);
        }}
      >
        {medicationsList.map((item) => {
          return (
            <Marker
              coordinate={item.coordinate}
              pinColor={"#0099ff"}
              title={"Заголовок"}
              description={`Описание`}
              key={newId()}
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
        })}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  map__tooltip: {
    borderRadius: 10,
    backgroundColor: "#fff",
    padding: 10,
  },
  tooltip__row: {},
  map: {
    width: "100%",
    height: "100%",
  },
  map__wrapper: {
    padding: 10,
    height: Dimensions.get("window").height * 0.7,
    width: "100%",
  },
});
