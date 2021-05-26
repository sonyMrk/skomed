import React, { useRef, useEffect, useState } from "react";
import { StyleSheet, View, Dimensions, Platform } from "react-native";
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";

import newId from "../utils/newId";
import { InfoItem } from "../components/ui/InfoItem";

export const MedicationsMap = ({ medicationsList }) => {
  const mapRef = useRef(null);
  const [permissionState, setPermissionState] = useState(null);
  const [location, setLocation] = useState(null);
  const [margin, setMargin] = useState({
    bottom: 1,
  });

  useEffect(() => {
    askPermissions();
  }, []);

  useEffect(() => {
    if (location) {
      console.log("IF");
      setTimeout(() => {
        mapRef.current.fitToCoordinates(
          [
            {
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            },
          ],
          {
            animated: true,
          }
        );
      }, 500);
    } else {
      console.log("ELSE");
      setTimeout(() => {
        mapRef.current.fitToElements(Platform.OS === "android");
      }, 500);
    }
  }, [location]);

  const askPermissions = async () => {
    try {
      let location = await Location.getCurrentPositionAsync({});
      let { status } = await Location.requestForegroundPermissionsAsync();
      setPermissionState(status);
      setLocation(location);
    } catch (error) {
      console.log("Нет разрешения");
    }
  };

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
