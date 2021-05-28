import React, { useRef, useEffect, useState } from "react";
import { StyleSheet, View, Dimensions, Platform } from "react-native";
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from "react-native-maps";

import newId from "../../../utils/newId";
import { InfoItem } from "../../../components/ui/InfoItem";
import { Preloader } from "../../../components/ui/Preloader";
import { AppMapMarker } from "./AppMapMarker";

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
        {medicationsList &&
          medicationsList.map((item) => {
            return <AppMapMarker item={item} key={newId()} />;
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
