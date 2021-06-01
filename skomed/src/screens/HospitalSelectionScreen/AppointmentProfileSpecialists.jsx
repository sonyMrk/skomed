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
  getProfileSpecsData,
  clearProfileSpecs,
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
  getAppointmentProfileSpecDataState,
  getAppointmentProfileSpecLoadingState,
} from "../../store/selectors/appointment";
import { getUserFamilyState } from "../../store/selectors/user";
import { Stepper } from "./components/Stepper";
import { normalize } from "../../utils/normalizeFontSize";
import { PeopleItem } from "./components/PeopleItem";
import { ModalAddPerson } from "./components/ModalAddPerson";
import { createFamilyPerson } from "../../store/actions/user";
import { FullOrganizationCard } from "./components/FullOrganizationCard";
import { SaveAppointmentResult } from "./components/SaveAppointmentResult";
import { SelectSpecialization } from "./components/SelectSpecialization";
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

//  TODO: Последний экран с результатом записи,  СКРОЛЛЫ,

export const AppointmentProfileSpecialists = ({ navigation }) => {
  const [organization, setOrganization] = useState(null); // выбранная мед. организация
  const [step, setStep] = useState(1); // шаг записи
  const [visibleAddModal, setVisibleAddModal] = useState(false); // видимость модального окна для добавления нового пациента
  const [selectedIIN, setSelectedIIN] = useState(null); // выбранный ИИН
  const [appointmentTime, setAppointmentTime] = useState(null); // время приема
  const [appointmentData, setAppointmentData] = useState(null); // данные (id кабинета, массив свободныч часов, даты и т.д)
  const [reason, setReason] = useState(""); // причина визита
  const [specialization, setSpecialization] = useState(null); // специализация обьект с массивом врачей, id, name, коды ошибок
  const [doctor, setDoctor] = useState(null); // обьект с доктором {"Doctor" : "", "DoctorID"}

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
        showAlert(appointmentUserData.ErrorDesc);
      } else if (
        // если запрещена запись на прием
        appointmentUserData.RegAvailable !== 1 ||
        appointmentUserData.HomeCallAvailable !== 1
      ) {
        showAlert();
      } else if (appointmentError) {
        showAlert(appointmentError);
      } else {
        setStep(2);
        dispatch(getProfileSpecsData(appointmentUserData.AttachmentID));
      }
    }
  }, [appointmentUserData, organization, appointmentError]);

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

  const showAlert = (title) =>
    Alert.alert(
      "Запись недоступна",
      title
        ? title
        : "В настоящий момент запись в МО прикрепления пациента не возможна!",
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
    setDoctor(null);
    setAppointmentData(null);
    setAppointmentTime(null);
    setSpecialization(null);
    setSelectedIIN(null);
    dispatch(clearShedule());
    dispatch(clearProfileSpecs());
    dispatch(clearAppointmentError());
    dispatch(clearHospitalsError());
    dispatch(clearAppointmentSaveResult());
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
    if (step < 2 || !doctor) {
      return;
    }
    goToSelectDate();
    setStep(3);
  };

  const goToHistory = () => {
    navigation.navigate("History");
    clearState();
  };

  const handleChangeDoctor = (value) => {
    setDoctor(value);
  };

  const goToSelectDate = () => {
    const orgId = appointmentUserData.AttachmentID;
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
        doctorName={appointmentUserData?.Doctor}
        hospitalName={appointmentUserData?.Attachment}
        goToHistory={goToHistory}
        specialization="Участковый врач"
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
            <ScrollView style={{ padding: 10 }}>
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
              <FullOrganizationCard appointmentUserData={appointmentUserData} />
              {/* Если загружается профили специализаций показываем прелоадер */}
              {isLoadingProfileSpecs ? (
                <View style={{ marginTop: normalize(10) }}>
                  <Preloader />
                </View>
              ) : (
                // иначе, если данные специализаций загружены то показываем селекты с выбором специализаций и врача
                profileSpecsData && (
                  <SelectSpecialization
                    specialization={specialization}
                    handleChangeSpecialization={handleChangeSpecialization}
                    profileData={profileSpecsData?.Profiles}
                    doctor={doctor}
                    handleChangeDoctor={handleChangeDoctor}
                    specializationData={specialization?.Specialists}
                    goToSelectDate={goToSelectDate}
                    disabled={!doctor}
                  />
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    // justifyContent: "space-between",
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
  title__text: {
    textAlign: "center",
    fontSize: normalize(20),
  },
  peoples: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: normalize(12),
    marginBottom: normalize(20),
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
  header: {
    paddingVertical: 10,
  },
});
