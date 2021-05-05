import React, { useEffect } from "react";
import { StyleSheet, ScrollView, View, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllHospitals,
  clearHospitalsError,
  clearAllHospitals,
} from "../store/actions/hospitals";
import { Preloader } from "../components/ui/Preloader";
import { AppBoldText } from "../components/ui/AppBoldText";
import { THEME } from "../theme";
import { getHospitalsLoadingState, getAllHospitalsState, getHospitalsErrorState } from "../store/selectors/hospitals";

export const SupportedHospitals = ({ navigation }) => {
  const isHospitalLoading = useSelector(getHospitalsLoadingState);
  const allHospitals = useSelector(getAllHospitalsState);
  const hospitalsLoadError = useSelector(getHospitalsErrorState);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllHospitals());

    return () => {
      dispatch(clearHospitalsError());
      dispatch(clearAllHospitals());
    };
  }, []);

  if (isHospitalLoading) {
    return <Preloader />;
  }

  return (
    <ScrollView contentContainerStyle={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <AppBoldText style={styles.title}>
            Список доступных организаций
          </AppBoldText>
          {hospitalsLoadError && (
            <AppBoldText style={styles.error}>{hospitalsLoadError}</AppBoldText>
          )}
          {allHospitals?.ErrorDesc !== 0 && (
            <AppBoldText style={styles.error}>
              {allHospitals?.ErrorDesc}
            </AppBoldText>
          )}
        </View>
        <ScrollView>
          <View style={styles.list}>
            {allHospitals &&
              allHospitals?.Orgs.map((org) => (
                // <TouchableOpacity >
                <View style={styles.item} key={org.value.OrgID}>
                  <AppBoldText style={{ textAlign: "center" }}>
                    {org.label}
                  </AppBoldText>
                </View>
                // </TouchableOpacity>
              ))}
          </View>
        </ScrollView>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingVertical: 10,
    borderBottomColor: THEME.MAIN_COLOR,
    borderBottomWidth: 2,
  },
  title: {
    textAlign: "center",
    fontSize: 18,
  },
  error: {
    color: THEME.DANGER_COLOR,
    fontSize: 18,
    textAlign: "center",
  },
  list: {
    padding: 15,
  },
  item: {
    padding: 10,
    marginBottom: 5,
  },
});
