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

import { useDispatch, useSelector } from "react-redux";

import { AppBoldText } from "../../components/ui/AppBoldText";
import { THEME } from "../../theme";
import { Preloader } from "../../components/ui/Preloader";
import {
  getHospitalsForAppointment,
  clearHospitalsError,
} from "../../store/actions/hospitals";
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
import { Stepper } from "./components/Stepper";
import { normalize } from "../../utils/normalizeFontSize";
import { PeopleItem } from "./components/PeopleItem";
import { ModalAddPerson } from "./components/ModalAddPerson";
import { createFamilyPerson } from "../../store/actions/user";
import { FullOrganizationCard } from "./components/FullOrganizationCard";
import { SaveAppointmentResult } from "./components/SaveAppointmentResult";
import { SelectDate } from "./components/SelectDate";

const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  "window"
);

const titles = {
  1: "Кого записываем?",
  2: "Куда записываем?",
  3: "Выберите время",
  4: "",
};

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
      clearState();
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
        showAlert();
      } else {
        setStep(2);
      }
    }
  }, [appointmentUserData, organization, appointmentError]);

  useEffect(() => {
    if (!hospitalsLoadError && !appointmentError && step === 3) {
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

  const showAlert = () =>
    Alert.alert(
      "Запись недоступна",
      "В настоящий момент запись в МО прикрепления пациента не возможна!",
      [
        {
          text: "Ок",
          onPress: () => {
            clearState();
          },
          style: "default",
        },
      ],
      {
        cancelable: true,
        onDismiss: () => clearState(),
      }
    );

  const clearState = () => {
    setStep(1);
    setAppointmentData(null);
    setAppointmentTime(null);
    setOrganization(null);
    dispatch(clearShedule());
    dispatch(clearAppointmentSaveResult());
    dispatch(clearAppointmentError());
    dispatch(clearHospitalsError());
  };

  const onPressOne = () => {
    clearState();
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

  const handlePressOnCard = () => {
    setStep(3);
  };

  if (isHospitalLoading || isLoadingUserData || saveAppointmentLoading) {
    return <Preloader />;
  }

  if ((hospitalsLoadError || appointmentError) && step === 3) {
    return (
      <View style={{ flex: 1 }}>
        <Stepper
          step={step}
          onPressOne={clearState}
          onPressTwo={onPressTwo}
          onPressThree={onPressThree}
        />
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
      </View>
    );
  }

  if (saveAppointmentResult) {
    return (
      <SaveAppointmentResult
        result={saveAppointmentResult}
        result={saveAppointmentResult}
        doctorName={appointmentUserData?.Doctor}
        hospitalName={appointmentUserData?.Attachment}
        goToHistory={goToHistory}
        specialization="Участковый врач"
      />
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
          {[...family].length > 0 && (
            <ScrollView
              style={{
                padding: 15,
                marginTop: normalize(15),
              }}
            >
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
          )}
        </>
      )}

      {step === 2 && appointmentUserData && (
        <View style={styles.organizationList}>
          <FullOrganizationCard
            appointmentUserData={appointmentUserData}
            onPress={handlePressOnCard}
          />
        </View>
      )}

      {isLoadingShedule ? (
        <Preloader />
      ) : (
        shedule &&
        step === 3 && (
          <SelectDate
            appointmentData={appointmentData}
            handleChangeDate={handleChangeDate}
            sheduleData={shedule?.Dates}
            setAppointmentTime={setAppointmentTime}
            handleSaveAppointment={handleSaveAppointment}
            appointmentTime={appointmentTime}
          />
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  organizationList: {
    padding: 15,
  },
  error__container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: normalize(20),
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
  title__text: {
    textAlign: "center",
    fontSize: normalize(20),
  },
  peoples: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: normalize(12),
    marginBottom: normalize(25),
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
  header: {
    paddingVertical: 10,
  },
});
