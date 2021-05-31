import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Dimensions,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";

import { useDispatch, useSelector } from "react-redux";

import { AppBoldText } from "../../components/ui/AppBoldText";
import { THEME } from "../../theme";
import { Preloader } from "../../components/ui/Preloader";
import { getHospitalsForAppointment } from "../../store/actions/hospitals";
import {
  getAppointmentUserData,
  clearUserData,
  setAppointmentError,
  clearAppointmentError,
  getShedule,
  clearShedule,
  clearAppointmentSaveResult,
  saveAppointment,
  getProfileSpecsData,
  clearProfileSpecs,
} from "../../store/actions/appointment";
import {
  getHospitalsLoadingState,
  getHospitalsForPaidAppointmentState,
  getHospitalsErrorState,
} from "../../store/selectors/hospitals";
import {
  getAppointmentErrorMessageState,
  getAppointmentUserDataState,
  getAppointmentUserDataLoadingState,
  getAppointmentSheduleState,
  getAppointmentSheduleLoadingState,
  getSaveAppointmentResultState,
  getSaveAppointmentLoadingState,
  getAppointmentProfileSpecDataState,
  getAppointmentProfileSpecLoadingState,
} from "../../store/selectors/appointment";
import { getUserFamilyState } from "../../store/selectors/user";
import { AppText } from "../../components/ui/AppText";
import { Stepper } from "./components/Stepper";
import { normalize } from "../../utils/normalizeFontSize";
import { PeopleItem } from "./components/PeopleItem";
import { ModalAddPerson } from "./components/ModalAddPerson";
import { createFamilyPerson } from "../../store/actions/user";
import { FullOrganizationCard } from "./components/FullOrganizationCard";
import { AppButton } from "../../components/ui/AppButton";
import { formatServerDate } from "../../utils/formatDate";
import { SaveAppointmentResult } from "./components/SaveAppointmentResult";
import { MinOrganizationCard } from "./components/MinOrganizationCard";
import { AppSelect } from "../../components/ui/AppSelect";

const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  "window"
);

const titles = {
  1: "Кого записываем?",
  2: "Куда записываем?",
  3: "Выберите время",
  4: "",
};

//  TODO: Последний экран с результатом записи,  СКРОЛЛЫ,

export const PaidDoctorAppointment = ({ navigation }) => {
  const [organization, setOrganization] = useState(null); // выбранная мед. организация
  const [step, setStep] = useState(1); // шаг записи
  const [visibleAddModal, setVisibleAddModal] = useState(false); // видимость модального окна для добавления нового пациента
  const [selectedIIN, setSelectedIIN] = useState(null); // выбранный ИИН
  const [appointmentTime, setAppointmentTime] = useState(null); // время приема
  const [appointmentData, setAppointmentData] = useState(null); // данные (id кабинета, массив свободныч часов, даты и т.д)
  const [reason, setReason] = useState(""); // причина визита
  const [specialization, setSpecialization] = useState(null); // специализация обьект с массивом врачей, id, name, коды ошибок
  const [doctor, setDoctor] = useState(null); // обьект с доктором {"Doctor" : "", "DoctorID"}
  const [activeIndex, setActiveIndex] = useState(null);

  const dispatch = useDispatch();

  const family = useSelector(getUserFamilyState);

  const isHospitalLoading = useSelector(getHospitalsLoadingState);
  const hospitalsForAppointment = useSelector(
    getHospitalsForPaidAppointmentState
  );
  const hospitalsLoadError = useSelector(getHospitalsErrorState);

  const appointmentUserData = useSelector(getAppointmentUserDataState);
  const appointmentError = useSelector(getAppointmentErrorMessageState);
  const isLoadingUserData = useSelector(getAppointmentUserDataLoadingState);

  const saveAppointmentResult = useSelector(getSaveAppointmentResultState);
  const saveAppointmentLoading = useSelector(getSaveAppointmentLoadingState);

  const profileSpecsData = useSelector(getAppointmentProfileSpecDataState);

  const isLoadingProfileSpecs = useSelector(
    getAppointmentProfileSpecLoadingState
  );

  const shedule = useSelector(getAppointmentSheduleState);
  const isLoadingShedule = useSelector(getAppointmentSheduleLoadingState);

  useEffect(() => {
    dispatch(getHospitalsForAppointment());
    return () => {
      // действия при анмаунте
      clearState();
    };
  }, []);

  useEffect(() => {
    dispatch(clearAppointmentError());
    // если выбрана организация  и выбран ИИН и есть данные о пациенте:
    if (organization && selectedIIN && appointmentUserData) {
      if (organization.DisableDoctorSelection) {
        dispatch(getShedule(organization.OrgID));
        setStep(3);
      } else {
        dispatch(getProfileSpecsData(organization.OrgID));
        setStep(2);
      }
    }
  }, [organization]);

  //   useEffect(() => {
  //     if ((!hospitalsLoadError || !appointmentError) && step === 3) {
  //       const doctorId = appointmentUserData.DoctorID;
  //       const orgId = appointmentUserData.AttachmentID;
  //       dispatch(getShedule(orgId, doctorId));
  //     }
  //   }, [step]);

  // Получить данные о пациенте с базы
  const fetchData = (IIN) => {
    dispatch(getAppointmentUserData(IIN));
  };

  // обработчик выбора ИИН из членов семьи
  const selectIIN = (IIN) => {
    dispatch(clearUserData());
    setSelectedIIN(IIN);
    setStep(2);
    fetchData(IIN);
  };

  const handleOpenModal = () => {
    setVisibleAddModal(true);
  };

  const handleCloseModal = () => {
    setVisibleAddModal(false);
  };

  const addFamilyPerson = (newMan) => {
    dispatch(createFamilyPerson(newMan));
  };

  const handleChangeDate = (data) => {
    setAppointmentTime(null);
    setAppointmentData(data);
  };

  const handleSaveAppointment = () => {
    const orgId = organization.OrgID;

    const orgName = organization.Name;

    const doctorName = doctor.Doctor;

    const doctorId = doctor.DoctorID;

    const info = {
      orgName,
      doctorName,
      orgId,
      timeStart: appointmentTime.TimeStart,
      data: appointmentData.Date,
      patientName: appointmentUserData.FIO,
    };

    dispatch(clearAppointmentError());
    clearState();
    dispatch(
      saveAppointment(
        info,
        selectedIIN,
        orgId,
        doctorId,
        appointmentData.Date,
        appointmentTime.TimeStart,
        appointmentTime.TimeEnd,
        1,
        appointmentData.CabinetID,
        reason,
        1,
        orgName
      )
    );
  };

  const clearState = () => {
    setStep(1);
    setDoctor(null);
    setAppointmentData(null);
    setAppointmentTime(null);
    setSpecialization(null);
    setActiveIndex(null);
    setOrganization(null);
    dispatch(clearShedule());
    dispatch(clearProfileSpecs());
  };

  const onPressTwo = () => {
    if (step < 2) {
      return;
    }
    setStep(2);
    setAppointmentData(null);
    setAppointmentTime(null);
    dispatch(clearShedule());
  };

  const onPressThree = () => {
    if (step < 2) {
      return;
    }
    setStep(3);
  };

  const goToHistory = () => {
    dispatch(clearAppointmentError());
    navigation.navigate("History");
    dispatch(clearAppointmentSaveResult());
  };

  const handleChangeDoctor = (value) => {
    setDoctor(value);
  };

  const goToSelectDate = () => {
    const orgId = organization?.OrgID;
    const doctorId = doctor?.DoctorID;
    const profileId = specialization?.GUID;
    if (doctorId) {
      dispatch(getShedule(orgId, doctorId, profileId));
      setStep(3);
    }
  };

  const handleChangeSpecialization = (value) => {
    if (!value) {
      setDoctor(null);
    }
    setSpecialization(value);
  };

  const handleSelectOrganization = (organization, activeIndex) => {
    setOrganization(organization);
    setActiveIndex(activeIndex);
    setDoctor(null);
  };

  if (isHospitalLoading || isLoadingUserData || saveAppointmentLoading) {
    return <Preloader />;
  }

  if ((hospitalsLoadError || appointmentError) && step === 3) {
    return (
      <View style={styles.error__container}>
        {hospitalsForAppointment?.ErrorDesc !== 0 ? (
          <AppBoldText style={styles.error}>
            {hospitalsForAppointment?.ErrorDesc}
          </AppBoldText>
        ) : null}
        {hospitalsLoadError && (
          <AppBoldText style={styles.error}>{hospitalsLoadError}</AppBoldText>
        )}
        {appointmentError && (
          <AppBoldText style={styles.error}>{appointmentError}</AppBoldText>
        )}
      </View>
    );
  }

  if (saveAppointmentResult) {
    return (
      <SaveAppointmentResult
        result={saveAppointmentResult}
        goToHistory={goToHistory}
        // specialization={"specialization.Name"}
      />
    );
  }

  return (
    <ScrollView contentContainerStyle={{ flex: 1 }}>
      <View style={styles.container}>
        <Stepper
          step={step}
          onPressOne={clearState}
          onPressTwo={onPressTwo}
          onPressThree={onPressThree}
        />
        <View style={styles.title}>
          <AppBoldText style={styles.title__text}>{titles[step]}</AppBoldText>
        </View>
        {step === 1 && (
          <>
            <ScrollView style={{ padding: 10, marginBottom: 20 }}>
              <View style={styles.peoples}>
                {[...family].map((people) => {
                  return (
                    <PeopleItem
                      item={people}
                      key={people.value}
                      onPress={selectIIN}
                    />
                  );
                })}
              </View>
            </ScrollView>
          </>
        )}

        {step === 2 && appointmentUserData && (
          <ScrollView>
            <View style={styles.organizationList}>
              {hospitalsForAppointment &&
                hospitalsForAppointment.map((hospital, index) => (
                  <MinOrganizationCard
                    organization={hospital}
                    key={hospital.value.OrgID}
                    active={index === activeIndex}
                    index={index}
                    onPress={handleSelectOrganization}
                  />
                ))}
              {/* Если загружается профили специализаций показываем прелоадер */}
              {isLoadingProfileSpecs ? (
                <View style={{ marginTop: normalize(10) }}>
                  <Preloader />
                </View>
              ) : (
                // иначе, если данные специализаций загружены то показываем селекты с выбором специализаций и врача
                profileSpecsData && (
                  <View style={styles.profileActions}>
                    <AppSelect
                      placeholder="Выберите специализацию:"
                      value={specialization}
                      onValueChange={handleChangeSpecialization}
                      data={
                        profileSpecsData?.Profiles
                          ? profileSpecsData?.Profiles
                          : []
                      }
                    />
                    <AppSelect
                      placeholder="Выберите врача:"
                      value={doctor}
                      onValueChange={handleChangeDoctor}
                      data={
                        specialization?.Specialists
                          ? specialization?.Specialists
                          : []
                      }
                    />
                    <AppButton
                      style={{ marginTop: normalize(10) }}
                      onPress={goToSelectDate}
                      disabled={!doctor}
                    >
                      Далее
                    </AppButton>
                  </View>
                )
              )}
            </View>
          </ScrollView>
        )}

        {isLoadingShedule && step === 3 ? (
          <Preloader />
        ) : (
          shedule &&
          step === 3 && (
            <View style={styles.selectDate}>
              <View style={styles.select}>
                <AppSelect
                  placeholder="Выберите дату"
                  value={appointmentData}
                  onValueChange={handleChangeDate}
                  data={shedule?.Dates ? shedule?.Dates : []}
                />
              </View>
              <View style={styles.times}>
                <View>
                  <AppText style={styles.times__title}>
                    Доступное время:
                  </AppText>
                </View>
                <ScrollView style={styles.time_scroll}>
                  <View style={styles.times__list}>
                    {appointmentData &&
                      appointmentData.Times.map((time) => {
                        return (
                          <TouchableOpacity
                            style={{
                              ...styles.times__item,
                              backgroundColor:
                                time.value.TimeStart ===
                                appointmentTime?.TimeStart
                                  ? "#66b0ff"
                                  : THEME.BLUE_COLOR,
                            }}
                            onPress={() => {
                              setAppointmentTime(time.value);
                            }}
                            key={time.label}
                            activeOpacity={0.9}
                          >
                            <AppText style={styles.item__text}>
                              {time.label}
                            </AppText>
                          </TouchableOpacity>
                        );
                      })}
                  </View>
                </ScrollView>
              </View>
              <AppButton
                style={{
                  marginTop: normalize(20),
                  marginHorizontal: normalize(15),
                }}
                disabled={!appointmentTime}
                onPress={handleSaveAppointment}
              >
                Далее
              </AppButton>
            </View>
          )
        )}

        {step === 1 && (
          <TouchableOpacity style={styles.add} onPress={handleOpenModal}>
            <View>
              <Image
                source={require("../../../assets/icons/add_btn.png")}
                style={styles.add_icon}
              />
            </View>
          </TouchableOpacity>
        )}

        <ModalAddPerson
          modalVisible={visibleAddModal && step === 1}
          closeModal={handleCloseModal}
          addPerson={addFamilyPerson}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    justifyContent: "space-between",
  },
  organizationList: {
    padding: 15,
  },
  error__container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  error: {
    color: THEME.DANGER_COLOR,
    fontSize: 18,
    textAlign: "center",
  },
  title: {},
  subtitle: {
    textAlign: "center",
    color: THEME.GRAY_COLOR,
  },
  header: {
    paddingVertical: 10,
  },
  select: {
    marginVertical: 10,
    marginHorizontal: normalize(15),
  },
  title__text: {
    textAlign: "center",
    fontSize: normalize(20),
  },
  peoples: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: normalize(12),
  },
  add: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    right: 15,
    bottom: 15,
    width: viewportWidth / 7,
    height: viewportWidth / 7,
    borderRadius: viewportWidth / 14,
    backgroundColor: THEME.MAIN_COLOR,
  },
  add_icon: {
    resizeMode: "contain",
    width: viewportWidth / 20,
    height: viewportWidth / 20,
  },
  times: {
    marginTop: normalize(20),
  },
  time_scroll: {
    height: viewportWidth / 1.7,
    marginVertical: 15,
  },
  times__list: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
  },
  times__title: {
    fontSize: normalize(20),
    marginHorizontal: normalize(15),
  },
  times__item: {
    flexBasis: (viewportWidth / 6) * 0.9,
    marginRight: 8,
    marginTop: 15,
    backgroundColor: THEME.BLUE_COLOR,
    padding: 8,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  item__text: { color: "#fff", fontSize: normalize(12) },
  result: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
  },
  result__text: {
    textAlign: "center",
    marginBottom: 10,
  },
  header: {
    paddingVertical: 10,
  },
  profileActions: {
    marginTop: normalize(20),
  },
  selectDate: {
    paddingBottom: normalize(25),
    flex: 1,
    justifyContent: "space-between",
  },
});
