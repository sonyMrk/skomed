import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Dimensions,
  Image,
  TouchableOpacity,
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
} from "../../store/actions/appointment";
import {
  getHospitalsLoadingState,
  getHospitalsForAppointmentState,
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

export const AppointmentFamilyDoctorScreen = ({ navigation }) => {
  const [organization, setOrganization] = useState(null); // выбранная мед. организация
  const [step, setStep] = useState(1); // шаг записи
  const [visibleAddModal, setVisibleAddModal] = useState(false); // видимость модального окна для добавления нового пациента
  const [selectedIIN, setSelectedIIN] = useState(null); // выбранный ИИН
  const [appointmentTime, setAppointmentTime] = useState(null); // время приема
  const [appointmentData, setAppointmentData] = useState(null); // данные (id кабинета, массив свободныч часов, даты и т.д)
  const [reason, setReason] = useState(""); // причина визита

  const dispatch = useDispatch();

  const family = useSelector(getUserFamilyState);

  const isHospitalLoading = useSelector(getHospitalsLoadingState);
  const hospitalsForAppointment = useSelector(getHospitalsForAppointmentState);
  const hospitalsLoadError = useSelector(getHospitalsErrorState);

  const appointmentUserData = useSelector(getAppointmentUserDataState);
  const appointmentError = useSelector(getAppointmentErrorMessageState);
  const isLoadingUserData = useSelector(getAppointmentUserDataLoadingState);

  const saveAppointmentResult = useSelector(getSaveAppointmentResultState);
  const saveAppointmentLoading = useSelector(getSaveAppointmentLoadingState);

  const shedule = useSelector(getAppointmentSheduleState);
  const isLoadingShedule = useSelector(getAppointmentSheduleLoadingState);

  useEffect(() => {
    dispatch(getHospitalsForAppointment());
    return () => {
      // действия при анмаунте
    };
  }, []);

  useEffect(() => {
    if (hospitalsForAppointment) {
      // должна быть первой в списке поликлиника прикрепления
      setOrganization(hospitalsForAppointment.Orgs[0].value);
    }
  }, [hospitalsForAppointment]);

  useEffect(() => {
    // если выбрана организация и получены данные о пациенте и выбран ИИН:
    if (organization && appointmentUserData && selectedIIN) {
      if (appointmentUserData.ErrorCode !== 0) {
        dispatch(setAppointmentError(appointmentUserData.ErrorDesc));
      } else if (
        // если запрещена запись на прием
        appointmentUserData.RegAvailable !== 1 ||
        appointmentUserData.HomeCallAvailable !== 1
      ) {
        dispatch(
          setAppointmentError(
            "В настоящий момент запись в МО прикрепления пациента не возможна!"
          )
        );
      } else {
        setStep(2);
      }
    }
  }, [appointmentUserData, organization, appointmentError]);

  useEffect(() => {
    if ((!hospitalsLoadError || !appointmentError) && step === 3) {
      const doctorId = appointmentUserData.DoctorID;
      const orgId = appointmentUserData.AttachmentID;
      dispatch(getShedule(orgId, doctorId));
    }
  }, [step]);

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
    const orgId = appointmentUserData.AttachmentID;

    const orgName = appointmentUserData.Attachment;

    const doctorName = appointmentUserData.Doctor;

    const doctorId = appointmentUserData.DoctorID;

    const info = {
      orgName,
      doctorName,
      orgId,
      timeStart: appointmentTime.TimeStart,
      data: appointmentData.Date,
      patientName: appointmentUserData.FIO,
    };

    dispatch(clearAppointmentError());
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

  const onPressOne = () => {
    setStep(1);
    setAppointmentData(null);
    setAppointmentTime(null);
    dispatch(clearShedule());
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
      <View style={styles.result}>
        <View style={styles.header}>
          <AppBoldText style={{ ...styles.title, color: "#009933" }}>
            Вы успешно записались на прием!
          </AppBoldText>
        </View>
        <AppText style={styles.result__text}>
          Дата приема: {saveAppointmentResult.timeStart} -{" "}
          {formatServerDate(saveAppointmentResult.data)}
        </AppText>
        <AppText style={styles.result__text}>
          Номер талона {saveAppointmentResult.ReceiptNumber}
        </AppText>
        <AppButton
          onPress={() => {
            dispatch(clearAppointmentError());
            navigation.navigate("History");
            dispatch(clearAppointmentSaveResult());
          }}
        >
          Перейти к истории записей
        </AppButton>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stepper
        step={step}
        onPressOne={onPressOne}
        onPressTwo={onPressTwo}
        onPressThree={onPressThree}
      />
      <View style={styles.title}>
        <AppBoldText style={styles.title__text}>{titles[step]}</AppBoldText>
      </View>
      {step === 1 && (
        <>
          <ScrollView>
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
        <View style={styles.organizationList}>
          <FullOrganizationCard
            appointmentUserData={appointmentUserData}
            setStep={setStep}
          />
        </View>
      )}

      {isLoadingShedule ? (
        <Preloader />
      ) : (
        shedule &&
        step === 3 && (
          <View>
            <View style={styles.select}>
              <RNPickerSelect
                fixAndroidTouchableBug={true}
                placeholder={{
                  label: "Выберите дату",
                  value: null,
                  color: "#000",
                }}
                value={appointmentData}
                onValueChange={handleChangeDate}
                items={shedule?.Dates ? shedule.Dates : []}
                useNativeAndroidPickerStyle={false}
                style={{
                  ...pickerSelectStyles,
                }}
                doneText="Выбрать"
                Icon={() => (
                  <Image
                    source={require("../../../assets/icons/arrow_down.png")}
                    style={styles.arrow}
                  />
                )}
              />
            </View>
            <View style={styles.times}>
              <View>
                <AppText style={styles.times__title}>Доступное время: </AppText>
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
          </View>
        )
      )}

      {step === 3 && (
        <AppButton
          style={{ marginTop: normalize(20) }}
          disabled={!appointmentTime}
          onPress={handleSaveAppointment}
        >
          Далее
        </AppButton>
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
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
  title: {
    paddingVertical: 10,
  },
  subtitle: {
    textAlign: "center",
    color: THEME.GRAY_COLOR,
  },
  header: {
    paddingVertical: 10,
  },
  select: {
    marginVertical: 10,
  },
  title__text: {
    textAlign: "center",
    fontSize: normalize(23),
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
  arrow: {
    resizeMode: "contain",
    width: viewportWidth / 20,
    height: viewportWidth / 20,
  },
  times: {
    marginTop: normalize(20),
  },
  time_scroll: {
    height: viewportWidth / 2,
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
});

const pickerSelectStyles = StyleSheet.create({
  headlessAndroidContainer: {
    backgroundColor: "#fff",
    paddingVertical: 15,
    paddingLeft: 15,
    justifyContent: "center",
  },
  inputAndroid: {
    color: "#000",
  },
  iconContainer: {
    padding: 5,
    marginRight: 10,
  },
  placeholder: {
    color: "#000",
    fontSize: normalize(16),
  },
  inputIOSContainer: {
    backgroundColor: "#fff",
    padding: normalize(10),
    justifyContent: "center",
  },
});
