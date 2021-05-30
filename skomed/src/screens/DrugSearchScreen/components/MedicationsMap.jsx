import React, { useRef, useState } from "react";
import { StyleSheet, View, Platform } from "react-native";
import { PROVIDER_GOOGLE } from "react-native-maps";
import MapView from "react-native-map-clustering";

import newId from "../../../utils/newId";
import { AppMapMarker } from "./AppMapMarker";
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
    <View style={styles.map__wrapper}>
      <MapView
        style={{ ...styles.map, marginBottom: margin.bottom }}
        ref={mapRef}
        // provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        showsMyLocationButton={true}
        mapPadding={{ bottom: 50 }}
        onMapReady={onMapReady}
        initialRegion={region}
        clusteringEnabled={true}
      >
        {medicationsMarkers &&
          Object.keys(medicationsMarkers).map((key) => {
            return (
              <AppMapMarker item={medicationsMarkers[key]} key={newId()} />
            );
          })}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
  map__wrapper: {
    width: "100%",
  },
});
