import React, { useRef, useState } from "react";
import { StyleSheet, View, Platform } from "react-native";
import { PROVIDER_GOOGLE } from "react-native-maps";
import MapView from "react-native-map-clustering";
import { Marker, Callout } from "react-native-maps";

import { InfoItem } from "../../../components/ui/InfoItem";
import newId from "../../../utils/newId";
import { useSelector } from "react-redux";
import { getMedicationsMarkerListState } from "../../../store/selectors/medications";

export const MedicationsMap = ({ region }) => {
  const mapRef = useRef(null);

  const medicationsMarkers = useSelector(getMedicationsMarkerListState);

  const [margin, setMargin] = useState({
    // костыль для того чтобы на андройде отображалась кнопка моего местоположения
    bottom: 1,
  });

  const onMapReady = () => {
    if (Platform.OS === "android") {
      setMargin({
        bottom: 0,
      });
    }
    mapRef.current.animateToRegion(region, 1000);
  };
  return (
    <MapView
      style={{ flex: 1, marginBottom: margin.bottom }}
      ref={mapRef}
      provider={PROVIDER_GOOGLE}
      showsUserLocation={true}
      showsMyLocationButton={true}
      mapPadding={{ bottom: 50 }}
      onMapReady={onMapReady}
      initialRegion={region}
      clusteringEnabled={true}
      clusterColor="#c68c53"
    >
      {medicationsMarkers &&
        Object.keys(medicationsMarkers).map((key) => {
          return (
            <Marker
              coordinate={medicationsMarkers[key].coordinate}
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
                    value={medicationsMarkers[key].address}
                    style={styles.tooltip__row}
                  />
                  <InfoItem
                    title="Аптека"
                    value={medicationsMarkers[key].apteka}
                    style={styles.tooltip__row}
                  />
                  <InfoItem
                    title="Телефон"
                    value={medicationsMarkers[key].phone}
                    style={styles.tooltip__row}
                  />
                  <InfoItem
                    title="График работы"
                    value={medicationsMarkers[key].workTime}
                  />
                </View>
              </Callout>
            </Marker>
          );
        })}
    </MapView>
  );
};

const styles = StyleSheet.create({
  map__tooltip: {
    borderRadius: 10,
    backgroundColor: "#fff",
    padding: 10,
  },
  tooltip__row: {},
});
