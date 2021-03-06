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
  setEvaluation,
  clearEvaluationResult,
} from "../store/actions/hospitals";
import { Preloader } from "../components/ui/Preloader";
import { THEME } from "../theme";
import {
  getHospitalsLoadingState,
  getAllHospitalsState,
  getHospitalsErrorState,
  getDataListForRaitingLoadingState,
  getDoctorsListForRaitingState,
  getListForWorkIndicatorsState,
  getScanDoctorsListForRaitingState,
  getEvaluationResultState,
  getEvaluationResultLoadingState,
} from "../store/selectors/hospitals";

import { AppBoldText } from "../components/ui/AppBoldText";
import { AppTextInput } from "../components/ui/AppTextInput";
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

  const userProfile = useSelector(getUserProfileState);

  const evaluationResult = useSelector(getEvaluationResultState);
  const evaluationResultLoading = useSelector(getEvaluationResultLoadingState);

  const iin = useSelector(getUserIINState);

  const [isScanScreen, setIsScanScreen] = useState(false);
  const [raiting, setRaiting] = useState({});

  const [organization, setOrganization] = useState(null); // ?????????????????? ??????. ??????????????????????
  const [doctor, setDoctor] = useState(null);

  const [comment, setComment] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getHospitalsForRaiting());

    return () => {
      setRaiting({});
      dispatch(clearListOfWorkIndicator());
      dispatch(clearHospitalsError());
      dispatch(clearAllHospitals());
      dispatch(clearDataListForRaing());
      dispatch(clearEvaluationResult());
    };
  }, []);

  useEffect(() => {
    if (hospitals) {
      setOrganization(hospitals.Orgs[0].value);
    }
  }, [hospitals]);

  useEffect(() => {
    if (organization) {
      dispatch(clearHospitalsError()); // ?????? ???????????? ?????????????? ???????????? ??????????????????????, ???????????????? ?????????????? ?????? ???????????? ??????????????
      dispatch(getDataListForRaiting(organization.GUID));
    }
  }, [organization]);

  useEffect(() => {
    if (doctor) {
      dispatch(getListForWorkIndicator(doctor.CabinetTypeID));
    }
  }, [doctor]);

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
    setDoctor(null);
    if (doctor) {
      dispatch(getListForWorkIndicator(doctor.CabinetTypeID));
    }
  };

  const handlePressSetRate = () => {
    const indicators = Object.keys(raiting).map((key) => ({
      GUID: key,
      Value: raiting[key],
    }));

    dispatch(
      setEvaluation(
        iin,
        organization?.GUID,
        doctor.DoctorGUID,
        doctor.Doctor,
        doctor.CabinetGUID,
        doctor.Cabinet,
        JSON.stringify(indicators),
        comment
      )
    );
    setComment("")
  };

  const handleScanAgain = () => {
    dispatch(clearScanDataListForRaiting());
    setRaiting({});
    dispatch(clearListOfWorkIndicator());
    dispatch(clearHospitalsError());
  };

  if (isHospitalLoading) {
    return <Preloader />;
  }

  if (!userProfile) {
    return (
      <View style={styles.authContainer}>
        <AppBoldText style={styles.authText}>
          ?????? ???????????? ???????????????????? ???????????? ??????????????????????!
        </AppBoldText>
        <AppBoldText style={styles.authText}>
          ?????? ?????????????????????? ?????? ?????? ?? ?????????? ???????????????? ?????? ?????????????????? ????????
          ??????????????????????????!
        </AppBoldText>
        <AppBoldText style={styles.authText}>
          ?????????????????????????? ???????????????? ???? ??????????????????!
        </AppBoldText>
        <AppButton onPress={handleNavigateOnProfile}>
          ?????????????? ?? ??????????????????????
        </AppButton>
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <AppBoldText style={styles.title}>???????????? ???????????? ??????????</AppBoldText>
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
                  ???????????? ??????????????
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
                  ?????????????????????? QR-code
                </AppText>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        {evaluationResult || evaluationResultLoading ? (
          <View>
            {evaluationResultLoading ? (
              <Preloader />
            ) : (
              <View>
                <AppBoldText
                  style={{
                    textAlign: "center",
                    color: "#009933",
                    marginBottom: 15,
                  }}
                >
                  ???????????? ??????????????????!
                </AppBoldText>
                <AppButton
                  onPress={() => {
                    dispatch(clearEvaluationResult());
                  }}
                >
                  ?????????????????? ??????????
                </AppButton>
              </View>
            )}
          </View>
        ) : (
          <View>
            {isScanScreen ? (
              <View style={styles.flex}>
                {/* ???????????????????? ????????????? */}

                {!scanDoctorsList ? (
                  // ???????? ?????? ???????????? ???????????????????? ??????????????
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
                            {doctor && (
                              <View style={styles.header}>
                                <AppText style={styles.title_cab}>
                                  {doctor.Cabinet}
                                </AppText>
                              </View>
                            )}
                            <View style={styles.header}>
                              <AppText style={styles.subtitle}>
                                ???????????????? ??????????
                              </AppText>
                            </View>
                            <RNPickerSelect
                              fixAndroidTouchableBug={true}
                              placeholder={{
                                value: null,
                                label: "???????????????? ??????????",
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
                              ?????????????????? ???????????? ???? 1 - 5
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
                                  style={{
                                    textAlign: "center",
                                    marginBottom: 10,
                                  }}
                                >
                                  {indicator.Name}
                                </AppBoldText>
                                <RNPickerSelect
                                  fixAndroidTouchableBug={true}
                                  placeholder={{
                                    value: null,
                                    color: THEME.MAIN_COLOR,
                                    label: "???????????????? ????????????",
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
                          Object.keys(raiting).length <
                            listOfWorkIndicators?.length
                        }
                      >
                        ?????????????????? ????????????
                      </AppButton>
                    </View>
                    <AppButton
                      onPress={handleScanAgain}
                      style={{ marginTop: 15 }}
                    >
                      ?????????????????????? ?????? ??????
                    </AppButton>
                  </View>
                )}
              </View>
            ) : (
              <View>
                <View style={styles.select}>
                  <View style={styles.header}>
                    <AppText style={styles.subtitle}>
                      ???????????????? ??????. ??????????????????????
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
                      {doctor && (
                        <View style={styles.header}>
                          <AppText style={styles.title_cab}>
                            {doctor.Cabinet}
                          </AppText>
                        </View>
                      )}
                      <View style={styles.header}>
                        <AppText style={styles.subtitle}>
                          ???????????????? ??????????
                        </AppText>
                      </View>
                      <RNPickerSelect
                        fixAndroidTouchableBug={true}
                        placeholder={{
                          value: null,
                          label: "???????????????? ??????????",
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
                        ?????????????????? ???????????? ???? 1 - 5
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
                              label: "???????????????? ????????????",
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
                    <AppBoldText
                      style={{ textAlign: "center", marginBottom: 10 }}
                    >
                      ??????????????????????
                    </AppBoldText>
                    <AppTextInput
                      placeholder="??????????????????????"
                      value={comment}
                      onChange={setComment}
                      multiline={true}
                      numberOfLines={4}
                      autoCapitalize="sentences"
                      style={{ height: 90, marginTop: 10 }}
                    />
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
                  ?????????????????? ????????????
                </AppButton>
              </View>
            )}
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
  title_cab: {
    textAlign: "center",
    fontSize: 18,
    marginTop: 20,
    paddingBottom: 15,
    borderBottomWidth: 2,
    borderColor: THEME.MAIN_COLOR,
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
