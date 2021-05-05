import React, { useEffect, useState, useCallback } from "react";
import { StyleSheet, View, Alert, ScrollView } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

import { useDispatch, useSelector } from "react-redux";

import { AppBoldText } from "../components/ui/AppBoldText";
import { THEME } from "../theme";
import { AppTextInput } from "../components/ui/AppTextInput";
import { AppButton } from "../components/ui/AppButton";
import { InfoBlock } from "../components/InfoBlock";
import { Preloader } from "../components/ui/Preloader";
import {
  clearHospitalsError,
  getAllHospitals,
  clearAllHospitals,
  getDataListForTimetable,
} from "../store/actions/hospitals";
import { getHospitalsLoadingState, getAllHospitalsState, getHospitalsErrorState, getDoctorsList } from "../store/selectors/hospitals";

export const ScheduleScreen = ({ navigation }) => {

  const [organization, setOrganization] = useState(null); // выбранная мед. организация
  const [doctor, setDoctor] = useState(null);

  const dispatch = useDispatch();


  const isHospitalLoading = useSelector(getHospitalsLoadingState);
  const hospitals = useSelector(getAllHospitalsState);
  const hospitalsLoadError = useSelector(getHospitalsErrorState);

  const doctorsList = useSelector(getDoctorsList)



  // действия при первом рэндеринге
  useEffect(() => {

    dispatch(getAllHospitals()); // получаем список организаций
    return () => {
      // действия при анмаунте
      dispatch(clearHospitalsError());
      dispatch(clearAllHospitals());
    };
  }, []);
  // устанавливаем первую организацию в селект после загрузки орагнизаций
  useEffect(() => {
    // if (hospitals?.Orgs) {
    //   setOrganization(hospitals.Orgs[0].value);
    // }
    console.log(hospitals)
  }, [hospitals]);

  useEffect(() => {
    // если выбрана организация:
    if (organization) {
        dispatch(getDataListForTimetable(organization.OrgID))
    }
  }, [organization]);


  useEffect(() => {
    if (doctorsList) {
      setDoctor(doctorsList[0])
    }
  }, [doctorsList])

  const fetchData = () => {

  };

  // обработчик выбора организации
  const handleChangeOrganization = (org) => {
    setOrganization(org);
  };

  const handleChangeDoctor = (doc) => {
    setDoctor(doc)
  }


  if (isHospitalLoading) {
    return <Preloader />;
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <AppBoldText style={styles.title}>Выбор мед организации</AppBoldText>
          {/* Выводим ошибки */}
          {hospitalsLoadError && (
            <AppBoldText style={styles.error}>{hospitalsLoadError}</AppBoldText>
          )}
          {hospitals?.ErrorDesc !== 0 && (
            <AppBoldText style={styles.error}>
              {hospitals?.ErrorDesc}
            </AppBoldText>
          )}
        </View>
        {hospitals && (
          <View style={styles.select}>
            <RNPickerSelect
              placeholder={{}}
              value={organization}
              onValueChange={handleChangeOrganization}
              items={hospitals?.Orgs ? hospitals?.Orgs : [] }
              useNativeAndroidPickerStyle={false}
              style={{
                ...pickerSelectStyles,
              }}
              Icon={() => (
                <AntDesign name="medicinebox" size={20} color="white" />
              )}
            />
          </View>
        )}
        {doctorsList && (
          <View style={styles.select}>
            <RNPickerSelect
              placeholder={{}}
              value={doctor}
              onValueChange={handleChangeDoctor}
              items={doctorsList ? doctorsList : []}
              useNativeAndroidPickerStyle={false}
              style={{
                ...pickerSelectStyles,
              }}
              Icon={() => (
                <AntDesign name="medicinebox" size={20} color="white" />
              )}
            />
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  header: {
    paddingVertical: 10,
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
  select: {
    marginBottom: 15,
  },
  input: {
    marginBottom: 15,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 20,
  },
});

const pickerSelectStyles = StyleSheet.create({
  headlessAndroidContainer: {
    borderColor: THEME.MAIN_COLOR,
    borderWidth: 1,
    borderRadius: 5,
    padding: 15,
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
