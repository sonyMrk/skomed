import React, { useEffect, useState } from "react";
import { StyleSheet, ScrollView, View, TouchableOpacity } from "react-native";
// import { useDispatch, useSelector } from "react-redux";
// import RNPickerSelect from "react-native-picker-select";


import {
  clearHospitalsError,
  clearAllHospitals,
  getHospitalsForRaiting,
} from "../store/actions/hospitals";
// import { Preloader } from "../components/ui/Preloader";
import { THEME } from "../theme";
// import {
//   getHospitalsLoadingState,
//   getAllHospitalsState,
//   getHospitalsErrorState,
//   getHospitalsErrorDesc
// } from "../store/selectors/hospitals";


import { AppBoldText } from "../components/ui/AppBoldText";
// import { AppText } from "../components/ui/AppText";
import { BarScanner } from "../components/BarScanner";

export const WorkEvaluation = ({}) => {
  // const isHospitalLoading = useSelector(getHospitalsLoadingState);
  // const hospitals = useSelector(getAllHospitalsState);
  // const hospitalsLoadError = useSelector(getHospitalsErrorState);
  // const hospitalsErrorDesc = useSelector(getHospitalsErrorDesc);

  const [data, setData] = useState(null);
  // const [organization, setOrganization] = useState(null); // выбранная мед. организация
  // const [doctor, setDoctor] = useState(null);

  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getHospitalsForRaiting());

  //   return () => {
  //     dispatch(clearHospitalsError());
  //     dispatch(clearAllHospitals());
  //   };
  // }, []);

  // if (isHospitalLoading) {
  //   return <Preloader />;
  // }

  const handleScannedQRCode = (data) => {
    setData(data);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <AppBoldText style={styles.title}>
          Отсканируйте QR-код для оценки
        </AppBoldText>
      </View>
      {/* {hospitalsLoadError ? (
            <AppBoldText style={styles.error}>{hospitalsLoadError}</AppBoldText>
          ) : hospitalsErrorDesc ? (
            <AppBoldText style={styles.error}>{hospitalsErrorDesc}</AppBoldText>
          ) : null} */}
      {!data && <BarScanner onScanned={handleScannedQRCode} />}
      {/* {hospitals && (
          <View style={styles.select}>
            <View style={styles.header}>
              <AppText style={styles.subtitle}>
                Выберите мед. организацию
              </AppText>
            </View>
            <RNPickerSelect
              fixAndroidTouchableBug={true}
              placeholder={{}}
              value={organization}
              onValueChange={setOrganization}
              items={hospitals?.Orgs ? hospitals?.Orgs : []}
              useNativeAndroidPickerStyle={false}
              style={{
                ...pickerSelectStyles,
              }}
              // Icon={() => (
              //   <AntDesign name="medicinebox" size={20} color="white" />
              // )}
            />
          </View>
        )} */}
        <AppBoldText>{data}</AppBoldText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  header: {
    paddingVertical: 5,
  },
  title: {
    textAlign: "center",
    fontSize: 18,
    borderBottomColor: THEME.MAIN_COLOR,
    borderBottomWidth: 2,
    paddingBottom: 15,
    marginBottom: 10,
    marginTop: 15,
  },
  error: {
    color: THEME.DANGER_COLOR,
    fontSize: 18,
    textAlign: "center",
  },
  subtitle: {
    textAlign: "center",
    color: THEME.GRAY_COLOR,
  },
  select: {
    marginBottom: 5,
  },
  doctorInfo: {
    backgroundColor: "#fff",
    padding: 10,
  },
  table: {
    borderWidth: 1,
    borderColor: THEME.MAIN_COLOR,
  },
  head: {
    height: 40,
    backgroundColor: "#e0ebeb",
  },
  text: {
    margin: 6,
  },
  timetable: {},
  item: {},
});


const pickerSelectStyles = StyleSheet.create({
  headlessAndroidContainer: {
    borderColor: THEME.MAIN_COLOR,
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 15,
    paddingLeft: 15,
    justifyContent: "center",
  },
  inputAndroid: {
    color: "#000",
  },
  iconContainer: {
    backgroundColor: THEME.MAIN_COLOR,
    padding: 5,
    borderRadius: 5,
  },
});