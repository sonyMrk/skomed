import React, { useState, useEffect } from "react";
import { StyleSheet, View, Dimensions, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as Location from "expo-location";

import { AppButton } from "../../components/ui/AppButton";
import {
  getMedicationsLoadingState,
  getMedicationsErrorState,
  getMedicationsListSortState,
  getMedicationsListState,
} from "../../store/selectors/medications";
import {
  clearMedicationsError,
  clearMedicationsList,
} from "../../store/actions/medications";
import { Preloader } from "../../components/ui/Preloader";
import { THEME } from "../../theme";
import { AppBoldText } from "../../components/ui/AppBoldText";
import { MedicationFilters } from "./components/MedicationFilters";
import MedicationResulList from "./components/MedicationResulList";
import { AppText } from "../../components/ui/AppText";
import { MedicationsMap } from "./components/MedicationsMap";
import { normalize } from "../../utils/normalizeFontSize";

export const DrugSearchScreen = ({ navigation }) => {
  const [mapScreen, setMapScreen] = useState(false);
  const [region, setInitRegion] = useState(null);
  const [mapLoading, setMapLoading] = useState(false);

  // const medicationsList = useSelector(getMedicationsListSortState(sortBy));
  const medicationsList = useSelector(getMedicationsListState);
  const medicationsLoading = useSelector(getMedicationsLoadingState);
  const medicationsError = useSelector(getMedicationsErrorState);

  const dispatch = useDispatch();

  const askPermissions = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      let location = await Location.getCurrentPositionAsync({});
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

  const handleReset = () => {
    dispatch(clearMedicationsError());
    dispatch(clearMedicationsList());
    // setMedicationName("");
    // setPharmacy(null);
    // setDistrict(null);
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
                <MedicationsMap region={region} />
              </View>
            ) : (
              <>
                <AppButton onPress={handleReset}>
                  Удалить результат поиска
                </AppButton>
                {medicationsList?.length == 0 ? (
                  <AppText style={styles.result__text}>
                    По вашему запросу результатов не найдено
                  </AppText>
                ) : null}
                <AppButton onPress={handleWatchOnMap} disabled={mapLoading}>
                  {mapLoading
                    ? "Идет загрузка карты..."
                    : "Посмотреть на карте"}
                </AppButton>

                <MedicationResulList medicationsList={medicationsList} />
              </>
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
  result__text: {
    textAlign: "center",
    marginVertical: 20,
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
  sorting: {
    paddingVertical: normalize(15),
    alignItems: "center",
    justifyContent: "space-between",
  },
  sorting__items: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: normalize(5),
  },
  sorting__item: {
    alignItems: "center",
    justifyContent: "center",
    marginLeft: normalize(10),
    padding: normalize(10),
    borderWidth: 1,
    borderColor: THEME.MAIN_COLOR,
    borderRadius: 10,
  },
});
