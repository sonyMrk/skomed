import React, { useEffect, useState } from "react";
import { StyleSheet, ScrollView, View, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import RNPickerSelect from "react-native-picker-select";

import {
  clearHospitalsError,
  clearAllHospitals,
  getHospitalsForRaiting,
} from "../store/actions/hospitals";
import { Preloader } from "../components/ui/Preloader";
import { THEME } from "../theme";
import {
  getHospitalsLoadingState,
  getAllHospitalsState,
  getHospitalsErrorState,
  getHospitalsErrorDesc,
} from "../store/selectors/hospitals";

import { AppBoldText } from "../components/ui/AppBoldText";
import { AppText } from "../components/ui/AppText";
import { BarScanner } from "../components/BarScanner";
import { getUserProfileState } from "../store/selectors/user";
import { AppButton } from "./../components/ui/AppButton";

export const WorkEvaluation = ({ navigation }) => {
  const isHospitalLoading = useSelector(getHospitalsLoadingState);
  const hospitals = useSelector(getAllHospitalsState);
  const hospitalsLoadError = useSelector(getHospitalsErrorState);
  const hospitalsErrorDesc = useSelector(getHospitalsErrorDesc);

  const [data, setData] = useState(null);
  const [isScanScreen, setIsScanScreen] = useState(false);

  const userProfile = useSelector(getUserProfileState);

  const [organization, setOrganization] = useState(null); // выбранная мед. организация
  const [doctor, setDoctor] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getHospitalsForRaiting());

    return () => {
      dispatch(clearHospitalsError());
      dispatch(clearAllHospitals());
    };
  }, []);

  if (isHospitalLoading) {
    return <Preloader />;
  }

  const handleScannedQRCode = (data) => {
    setData(data);
  };

  const handleNavigateOnProfile = () => {
    navigation.navigate("Profile");
  };

  if (!userProfile) {
    return (
      <View style={styles.authContainer}>
        <AppBoldText style={styles.authText}>
          Для оценки необходимо пройти авторизацию!
        </AppBoldText>
        <AppBoldText style={styles.authText}>
          Вам понадобится ваш ИИН и номер телефона для получения кода
          подтверждения!
        </AppBoldText>
        <AppBoldText style={styles.authText}>
          Подтверждения личности НЕ требуется!
        </AppBoldText>
        <AppButton onPress={handleNavigateOnProfile}>
          Перейти к авторизации
        </AppButton>
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <AppBoldText style={styles.title}>Оценка работы врача</AppBoldText>
        </View>
        <View style={styles.toggleProfile}>
          <View style={styles.checkboxWrapper}>
            <TouchableOpacity
              onPress={() => setIsScanScreen(false)}
              activeOpacity={0.5}
            >
              <View
                style={[
                  styles.checkbox,
                  !isScanScreen ? styles.activeCheckbox : {},
                ]}
              >
                <AppText
                  style={{
                    textAlign: "center",
                    color: !isScanScreen ? "#fff" : "#000",
                  }}
                >
                  Ввести вручную
                </AppText>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.checkboxWrapper}>
            <TouchableOpacity
              onPress={() => setIsScanScreen(true)}
              activeOpacity={0.5}
            >
              <View
                style={[
                  styles.checkbox,
                  isScanScreen ? styles.activeCheckbox : {},
                ]}
              >
                <AppText
                  style={{
                    textAlign: "center",
                    color: isScanScreen ? "#fff" : "#000",
                  }}
                >
                  Сканировать QR-code
                </AppText>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {hospitalsLoadError ? (
          <AppBoldText style={styles.error}>{hospitalsLoadError}</AppBoldText>
        ) : hospitalsErrorDesc ? (
          <AppBoldText style={styles.error}>{hospitalsErrorDesc}</AppBoldText>
        ) : null}

        {isScanScreen ? (
          <View style={styles.flex}>
            {/* Показывать сканер? */}

            {!data ? (
              // Если нет данных показываем сканнер
              <View style={styles.scannerWrapper}>
                <BarScanner onScanned={handleScannedQRCode} />
              </View>
            ) : (
              <View style={styles.flex}>
                {/* Выводим данные */}
                <AppBoldText>{data}</AppBoldText>
                <AppButton
                  onPress={() => {
                    setData(null);
                  }}
                >
                  Сканировать еще раз
                </AppButton>
              </View>
            )}
          </View>
        ) : (
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
  authContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
  },
  authText: {
    textAlign: "center",
    marginBottom: 10,
  },
  header: {
    paddingVertical: 5,
  },
  toggleProfile: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  checkboxWrapper: {
    flexBasis: "48%",
  },
  checkbox: {
    marginBottom: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: THEME.MAIN_COLOR,
    borderRadius: 10,
    height: 50,
  },
  activeCheckbox: {
    backgroundColor: THEME.MAIN_COLOR,
  },
  activeText: {
    color: "#fff",
  },
  title: {
    textAlign: "center",
    fontSize: 18,
    // borderBottomColor: THEME.MAIN_COLOR,
    // borderBottomWidth: 2,
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
  flex: {
    flex: 1,
  },
  scannerWrapper: {
    minHeight: 300,
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
