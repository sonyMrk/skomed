import React, { useEffect, useState } from "react";
import { StyleSheet, ScrollView, View, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import RNPickerSelect from "react-native-picker-select";

import {
  clearHospitalsError,
  clearAllHospitals,
  getHospitalsForRaiting,
  getDataListForRaiting,
  clearDataListForRaing,
  clearListOfWorkIndicator,
  getListForWorkIndicator,
  getScanDataListForRaiting,
  clearScanDataListForRaiting,
} from "../store/actions/hospitals";
import { Preloader } from "../components/ui/Preloader";
import { AppTextInput } from "../components/ui/AppTextInput";
import { THEME } from "../theme";
import {
  getHospitalsLoadingState,
  getAllHospitalsState,
  getHospitalsErrorState,
  getDataListForRaitingLoadingState,
  getDoctorsListForRaitingState,
  getListForWorkIndicatorsState,
  getScanDoctorsListForRaitingState,
} from "../store/selectors/hospitals";

import { AppBoldText } from "../components/ui/AppBoldText";
import { AppText } from "../components/ui/AppText";
import { BarScanner } from "../components/BarScanner";
import { getUserProfileState, getUserIINState } from "../store/selectors/user";
import { AppButton } from "./../components/ui/AppButton";

const rateList = [
  { label: "1", value: 1 },
  { label: "2", value: 2 },
  { label: "3", value: 3 },
  { label: "4", value: 4 },
  { label: "5", value: 5 },
];

export const WorkEvaluation = ({ navigation }) => {
  const isHospitalLoading = useSelector(getHospitalsLoadingState);
  const hospitals = useSelector(getAllHospitalsState);
  const hospitalsLoadError = useSelector(getHospitalsErrorState);
  const dataListForRaitingLoading = useSelector(
    getDataListForRaitingLoadingState
  );
  const doctorsList = useSelector(getDoctorsListForRaitingState);
  const scanDoctorsList = useSelector(getScanDoctorsListForRaitingState);
  const listOfWorkIndicators = useSelector(getListForWorkIndicatorsState);

  const iin = useSelector(getUserIINState);

  const [isScanScreen, setIsScanScreen] = useState(false);
  const [raiting, setRaiting] = useState({});

  const userProfile = useSelector(getUserProfileState);

  const [organization, setOrganization] = useState(null); // выбранная мед. организация
  const [doctor, setDoctor] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getHospitalsForRaiting());

    return () => {
      setRaiting({});
      dispatch(clearListOfWorkIndicator());
      dispatch(clearHospitalsError());
      dispatch(clearAllHospitals());
      dispatch(clearDataListForRaing());
    };
  }, []);

  useEffect(() => {
    if (hospitals) {
      setOrganization(hospitals.Orgs[0].value);
    }
  }, [hospitals]);

  useEffect(() => {
    if (organization) {
      dispatch(clearHospitalsError()); // БАГ ИНОГДА ВЫХОДИТ ОШИБКА АВТОРИЗАЦИИ, ПОПРОБУЮ СТЕРАТЬ ПРИ КАЖДОМ ЗАПРОСЕ
      dispatch(getDataListForRaiting(organization.GUID));
    }
  }, [organization]);

  useEffect(() => {
    if (doctor) {
      dispatch(getListForWorkIndicator(doctor.CabinetTypeID));
    }
  }, [doctor]);

  if (isHospitalLoading) {
    return <Preloader />;
  }

  const handleScannedQRCode = (data) => {
    const result = {};

    const pairs = data.split("#");
    for (let pair of pairs) {
      const keys = pair.split("_");
      result[keys[0]] = keys[1];
    }

    const orgId = result["OrgGUID"];
    const cabId = result["CabGUID"];

    if (orgId && cabId) {
      dispatch(getScanDataListForRaiting(orgId, cabId));
    }
  };

  const handleNavigateOnProfile = () => {
    navigation.navigate("Profile");
  };

  const handleChangeOrganization = (org) => {
    dispatch(clearHospitalsError());
    dispatch(clearDataListForRaing());
    setOrganization(org);
  };

  const handleChangeDoctor = (doctor) => {
    setDoctor(doctor);
  };

  const handleChangeScreen = (value) => {
    setIsScanScreen(value);
    dispatch(clearScanDataListForRaiting());
    dispatch(clearHospitalsError());
    setRaiting({});
    dispatch(clearListOfWorkIndicator());
    if (doctor) {
      dispatch(getListForWorkIndicator(doctor.CabinetTypeID));
    }
  };

  const handlePressSetRate = () => {
    console.log("iin", iin);
    console.log("organizationId", organization?.GUID);
    console.log("DoctorGUID", doctor.DoctorGUID);
    console.log("DoctorName", doctor.Doctor);
    console.log("CabinetGUID", doctor.CabinetGUID);
    console.log("CabinetName ", doctor.Cabinet);
    console.log(Object.keys(raiting).map((key) => ({ [key]: raiting[key] })));
  };

  const handleScanAgain = () => {
    dispatch(clearScanDataListForRaiting());
    setRaiting({});
    dispatch(clearListOfWorkIndicator());
    dispatch(clearHospitalsError());
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
        {hospitalsLoadError ? (
          <View style={styles.errorWrapper}>
            <AppBoldText style={styles.error}>{hospitalsLoadError}</AppBoldText>
          </View>
        ) : null}
        <View style={styles.toggleProfile}>
          <View style={styles.checkboxWrapper}>
            <TouchableOpacity
              onPress={() => handleChangeScreen(false)}
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
              onPress={() => handleChangeScreen(true)}
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
        {isScanScreen ? (
          <View style={styles.flex}>
            {/* Показывать сканер? */}

            {!scanDoctorsList ? (
              // Если нет данных показываем сканнер
              <View style={styles.scannerWrapper}>
                <BarScanner onScanned={handleScannedQRCode} />
              </View>
            ) : (
              <View style={styles.flex}>
                <View>
                  {dataListForRaitingLoading ? (
                    <Preloader style={{ marginTop: 15 }} />
                  ) : (
                    doctorsList && (
                      <View style={styles.select}>
                        <View style={styles.header}>
                          <AppText style={styles.subtitle}>
                            Выберите врача
                          </AppText>
                        </View>
                        <RNPickerSelect
                          fixAndroidTouchableBug={true}
                          placeholder={{
                            value: null,
                            label: "Выберите врача",
                            color: THEME.MAIN_COLOR,
                          }}
                          // value={doctor}
                          onValueChange={handleChangeDoctor}
                          items={scanDoctorsList ? scanDoctorsList : []}
                          useNativeAndroidPickerStyle={false}
                          style={{
                            ...pickerSelectStyles,
                          }}
                          // Icon={() => (
                          //   <AntDesign name="medicinebox" size={20} color="white" />
                          // )}
                        />
                      </View>
                    )
                  )}
                  {listOfWorkIndicators && doctor && (
                    <View style={styles.indicators}>
                      <View style={styles.header}>
                        <AppText style={styles.subtitle}>
                          Поставьте оценки от 1 - 5
                        </AppText>
                      </View>
                      {listOfWorkIndicators.map((indicator) => {
                        return (
                          <View
                            style={styles.indicators_item}
                            key={indicator.GUID}
                          >
                            <AppBoldText
                              key={indicator.GUID}
                              style={{ textAlign: "center", marginBottom: 10 }}
                            >
                              {indicator.Name}
                            </AppBoldText>
                            <RNPickerSelect
                              fixAndroidTouchableBug={true}
                              placeholder={{
                                value: null,
                                color: THEME.MAIN_COLOR,
                                label: "Выберите оценку",
                              }}
                              onValueChange={(value) => {
                                setRaiting((prev) => ({
                                  ...prev,
                                  [indicator.GUID]: value,
                                }));
                              }}
                              items={rateList}
                              useNativeAndroidPickerStyle={false}
                              style={{
                                ...pickerSelectStyles,
                              }}
                              // Icon={() => (
                              //   <AntDesign name="medicinebox" size={20} color="white" />
                              // )}
                            />
                          </View>
                        );
                      })}
                    </View>
                  )}

                  <AppButton
                    onPress={handlePressSetRate}
                    style={{ marginTop: 15 }}
                    disabled={
                      !listOfWorkIndicators ||
                      Object.keys(raiting).length < listOfWorkIndicators?.length
                    }
                  >
                    Поставить оценку
                  </AppButton>
                </View>
                <AppButton onPress={handleScanAgain} style={{ marginTop: 15 }}>
                  Сканировать еще раз
                </AppButton>
              </View>
            )}
          </View>
        ) : (
          <View>
            <View style={styles.select}>
              <View style={styles.header}>
                <AppText style={styles.subtitle}>
                  Выберите мед. организацию
                </AppText>
              </View>
              <RNPickerSelect
                fixAndroidTouchableBug={true}
                placeholder={{}}
                // value={organization}
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
            {dataListForRaitingLoading ? (
              <Preloader style={{ marginTop: 15 }} />
            ) : (
              doctorsList && (
                <View style={styles.select}>
                  <View style={styles.header}>
                    <AppText style={styles.subtitle}>Выберите врача</AppText>
                  </View>
                  <RNPickerSelect
                    fixAndroidTouchableBug={true}
                    placeholder={{
                      value: null,
                      label: "Выберите врача",
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
              )
            )}
            {listOfWorkIndicators && doctor && (
              <View style={styles.indicators}>
                <View style={styles.header}>
                  <AppText style={styles.subtitle}>
                    Поставьте оценки от 1 - 5
                  </AppText>
                </View>
                {listOfWorkIndicators.map((indicator) => {
                  return (
                    <View style={styles.indicators_item} key={indicator.GUID}>
                      <AppBoldText
                        key={indicator.GUID}
                        style={{ textAlign: "center", marginBottom: 10 }}
                      >
                        {indicator.Name}
                      </AppBoldText>
                      <RNPickerSelect
                        fixAndroidTouchableBug={true}
                        placeholder={{
                          value: null,
                          color: THEME.MAIN_COLOR,
                          label: "Выберите оценку",
                        }}
                        onValueChange={(value) => {
                          setRaiting((prev) => ({
                            ...prev,
                            [indicator.GUID]: value,
                          }));
                        }}
                        items={rateList}
                        useNativeAndroidPickerStyle={false}
                        style={{
                          ...pickerSelectStyles,
                        }}
                        // Icon={() => (
                        //   <AntDesign name="medicinebox" size={20} color="white" />
                        // )}
                      />
                    </View>
                  );
                })}
              </View>
            )}
            <AppButton
              onPress={handlePressSetRate}
              style={{ marginTop: 15 }}
              disabled={
                !listOfWorkIndicators ||
                Object.keys(raiting).length < listOfWorkIndicators?.length
              }
            >
              Поставить оценку
            </AppButton>
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
    marginBottom: 15,
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
  subtitle: {
    textAlign: "center",
    color: THEME.GRAY_COLOR,
  },
  select: {
    marginBottom: 5,
  },
  flex: {
    flex: 1,
  },
  scannerWrapper: {
    minHeight: 300,
  },
  indicators: {
    marginTop: 20,
  },
  indicators_item: {
    marginBottom: 15,
  },
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
