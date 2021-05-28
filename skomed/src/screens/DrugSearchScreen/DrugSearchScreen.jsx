import React, { useState, useEffect } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as Location from "expo-location";

import { AppButton } from "../../components/ui/AppButton";
import {
  getMedicationsLoadingState,
  getMedicationsErrorState,
  getMedicationsListState,
} from "../../store/selectors/medications";
import {
  getMedicationsList,
  clearMedicationsError,
  clearMedicationsList,
  setMedicationsLoading,
} from "../../store/actions/medications";
import { Preloader } from "../../components/ui/Preloader";
import { THEME } from "../../theme";
import { AppBoldText } from "../../components/ui/AppBoldText";
import { MedicationsMap } from "./components/MedicationsMap";
import { MedicationFilters } from "./components/MedicationFilters";
import { MedicationResulList } from "./components/MedicationResulList";

export const DrugSearchScreen = ({ navigation }) => {
  const [mapScreen, setMapScreen] = useState(false);
  const [permissionState, setPermissionState] = useState(null);
  const [region, setInitRegion] = useState(null);
  const [mapLoading, setMapLoading] = useState(false);

  const medicationsList = useSelector(getMedicationsListState);
  const medicationsLoading = useSelector(getMedicationsLoadingState);
  const medicationsError = useSelector(getMedicationsErrorState);

  const dispatch = useDispatch();

  const askPermissions = async () => {
    try {
      let location = await Location.getCurrentPositionAsync({});
      let { status } = await Location.requestForegroundPermissionsAsync();
      setPermissionState(status);
      setInitRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.00922,
        longitudeDelta: 0.00421,
      });
    } catch (error) {
      setInitRegion({
        latitude: 54.87203489516648,
        longitude: 69.1422355149971,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    }
  };

  const handleWatchOnMap = async () => {
    setMapLoading(true);
    await askPermissions();
    setMapLoading(false);
    setMapScreen(true);
  };

  const handleWatchOnList = () => {
    setMapScreen(false);
  };

  useEffect(() => {
    return () => {
      dispatch(clearMedicationsError());
      dispatch(clearMedicationsList());
    };
  }, []);

  return (
    <View style={styles.container}>
      {medicationsList ? (
        <View style={{ flex: 1 }}>
          <View style={styles.result}>
            {mapScreen ? (
              <View style={{ flex: 1 }}>
                <AppButton onPress={handleWatchOnList}>
                  Посмотреть список
                </AppButton>
                {medicationsList && (
                  <MedicationsMap
                    medicationsList={medicationsList}
                    region={region}
                  />
                )}
              </View>
            ) : (
              <MedicationResulList
                medicationsList={medicationsList}
                mapLoading={mapLoading}
                onSelectMap={handleWatchOnMap}
              />
            )}
          </View>
        </View>
      ) : (
        <View>
          {medicationsError ? (
            <View style={styles.errorWrapper}>
              <AppBoldText style={styles.error}>{medicationsError}</AppBoldText>
            </View>
          ) : null}
          {medicationsLoading ? (
            <View style={styles.preloader}>
              <Preloader />
            </View>
          ) : (
            <MedicationFilters />
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingVertical: 5,
  },
  preloader: {
    marginTop: 30,
  },
  title: {
    textAlign: "center",
    fontSize: 18,
    paddingBottom: 15,
    marginBottom: 10,
    marginTop: 15,
  },
  errorWrapper: {
    marginBottom: 15,
  },
  error: {
    color: THEME.DANGER_COLOR,
    fontSize: 18,
    textAlign: "center",
  },

  result: {
    flex: 1,
  },
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
    height: Dimensions.get("window").height * 0.9,
    width: "100%",
  },
});
