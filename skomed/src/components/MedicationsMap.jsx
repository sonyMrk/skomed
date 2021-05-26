import React, { useRef, useEffect, useState } from "react";
import { StyleSheet, View, Dimensions, Platform } from "react-native";
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from "react-native-maps";

import newId from "../utils/newId";
import { InfoItem } from "../components/ui/InfoItem";

export const MedicationsMap = ({ medicationsList, region }) => {
  const mapRef = useRef(null);
  const [margin, setMargin] = useState({
    bottom: 1,
  });

  const onMapReady = () => {
    if (Platform.OS === "android") {
      setMargin({
        bottom: 0,
      });
    }
  };

  return (
    <View style={styles.map__wrapper}>
      <MapView
        style={{ ...styles.map, marginBottom: margin.bottom }}
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        showsMyLocationButton={true}
        mapPadding={{ bottom: 50 }}
        onMapReady={onMapReady}
        initialRegion={region}
      >
        {medicationsList.map((item) => {
          return (
            <Marker
              coordinate={item.coordinate}
              pinColor={"#c68c53"}
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
    // Dimensions.get("window").height / 1.5
  },
  map__wrapper: {
    width: "100%",
  },
});
