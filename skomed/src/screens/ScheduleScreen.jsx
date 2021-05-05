import React, { useEffect, useState, useCallback } from "react";
import { StyleSheet, View, Alert, ScrollView } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { Table, Row, Rows } from "react-native-table-component";
import { AntDesign } from "@expo/vector-icons";

import { useDispatch, useSelector } from "react-redux";

import { AppBoldText } from "../components/ui/AppBoldText";
import { AppText } from "../components/ui/AppText";
import { THEME } from "../theme";
import { Preloader } from "../components/ui/Preloader";
import { InfoItem } from "../components/ui/InfoItem";
import {
  clearHospitalsError,
  getAllHospitals,
  clearAllHospitals,
  getDataListForTimetable,
  clearDataListForTimetable,
  getDoctorTimetable,
  clearDoctorTimetable,
} from "../store/actions/hospitals";
import {
  getHospitalsLoadingState,
  getAllHospitalsState,
  getHospitalsErrorState,
  getOrgDoctorsListState,
  getOrgDoctorsListLoadingState,
  getHospitalsErrorDesc,
  getDoctorTimetableState,
  getDoctorTimetableLoadingState,
} from "../store/selectors/hospitals";

const timetableHead = ["Дата", "Прием", "Перерыв"];

export const ScheduleScreen = ({ navigation }) => {
  const [organization, setOrganization] = useState(null); // выбранная мед. организация
  const [doctor, setDoctor] = useState(null);

  const dispatch = useDispatch();

  const isHospitalLoading = useSelector(getHospitalsLoadingState);
  const hospitals = useSelector(getAllHospitalsState);
  const hospitalsErrorDesc = useSelector(getHospitalsErrorDesc);
  const hospitalsLoadError = useSelector(getHospitalsErrorState);

  const doctorsList = useSelector(getOrgDoctorsListState);
  const doctorsListLoading = useSelector(getOrgDoctorsListLoadingState);
  const doctorTimetable = useSelector(getDoctorTimetableState);
  const doctorTimetableLoading = useSelector(getDoctorTimetableLoadingState);

  // действия при первом рэндеринге
  useEffect(() => {
    dispatch(getAllHospitals()); // получаем список организаций
    return () => {
      // действия при анмаунте
      dispatch(clearHospitalsError());
      dispatch(clearAllHospitals());
      dispatch(clearDoctorTimetable());
    };
  }, []);

  // устанавливаем первую организацию в селект после загрузки орагнизаций
  useEffect(() => {
    if (hospitals?.Orgs) {
      setOrganization(hospitals.Orgs[0].value);
    }
  }, [hospitals]);

  useEffect(() => {
    // если выбрана организация:
    if (organization) {
      dispatch(getDataListForTimetable(organization.OrgID));
    }
  }, [organization]);

  useEffect(() => {
    // если выбрана организация и врач
    if (organization && doctor) {
      dispatch(
        getDoctorTimetable(
          organization.OrgID,
          doctor.DoctorGUID,
          doctor.CabinetGUID
        )
      );
    }
  }, [organization, doctor]);

  // обработчик выбора организации
  const handleChangeOrganization = (org) => {
    setOrganization(org);
    setDoctor(null);
    dispatch(clearHospitalsError());
    dispatch(clearDataListForTimetable());
    dispatch(clearDoctorTimetable());
  };

  // обработчик выбора врача
  const handleChangeDoctor = (doc) => {
    if (doc) {
      setDoctor(doc);
    }
  };

  if (isHospitalLoading) {
    return <Preloader />;
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          {/* Выводим ошибки */}
          {hospitalsLoadError ? (
            <AppBoldText style={styles.error}>{hospitalsLoadError}</AppBoldText>
          ) : hospitalsErrorDesc ? (
            <AppBoldText style={styles.error}>{hospitalsErrorDesc}</AppBoldText>
          ) : null}
        </View>
        {hospitals && (
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
              onValueChange={handleChangeOrganization}
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
        )}
        {doctorsListLoading && <Preloader />}
        {!doctorsListLoading && doctorsList && (
          <View style={styles.select}>
            <View style={styles.header}>
              <AppText style={styles.subtitle}>Выберите врача</AppText>
            </View>
            <RNPickerSelect
              fixAndroidTouchableBug={true}
              placeholder={{
                label: "Выберите врача",
                value: null,
                color: THEME.MAIN_COLOR,
              }}
              value={doctor}
              onValueChange={handleChangeDoctor}
              items={doctorsList ? doctorsList : []}
              useNativeAndroidPickerStyle={false}
              style={{
                ...pickerSelectStyles,
              }}
              // Icon={() => (
              //   <AntDesign name="medicinebox" size={20} color="white" />
              // )}
            />
          </View>
        )}
        {doctor && (
          <View style={styles.doctorInfo}>
            <InfoItem title="Должность" value={doctor?.Position} />
            <InfoItem title="Кабинет" value={doctor?.Cabinet} />
          </View>
        )}
        <View style={styles.header}>
          <AppBoldText style={styles.title}>Расписание:</AppBoldText>
          {doctorTimetableLoading && <Preloader />}
        </View>
        {!doctorTimetableLoading && (
          <Table borderStyle={styles.table}>
            <Row
              data={timetableHead}
              style={styles.head}
              textStyle={styles.text}
            />
            <Rows
              data={doctorTimetable ? doctorTimetable : []}
              textStyle={styles.text}
            />
          </Table>
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
