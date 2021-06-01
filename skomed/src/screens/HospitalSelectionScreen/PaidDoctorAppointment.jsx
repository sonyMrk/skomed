import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Dimensions,
  Image,
  TouchableOpacity,
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
import { Stepper } from "./components/Stepper";
import { normalize } from "../../utils/normalizeFontSize";
import { PeopleItem } from "./components/PeopleItem";
import { ModalAddPerson } from "./components/ModalAddPerson";
import { createFamilyPerson } from "../../store/actions/user";
import { SaveAppointmentResult } from "./components/SaveAppointmentResult";
import { MinOrganizationCard } from "./components/MinOrganizationCard";
import { SelectSpecialization } from "./components/SelectSpecialization";
import { SelectDate } from "./components/SelectDate";

const { width: viewportWidth, height: viewportHeight } =
  Dimensions.get("window");

const titles = {
  1: "Кого записываем?",
  2: "Куда записываем?",
  3: "Выберите время",
  4: "",
};

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
    dispatch(clearHospitalsError());
    dispatch(clearAppointmentError());
    dispatch(clearAppointmentSaveResult());
  };

  const onPressTwo = () => {
    if (step < 2) {
      return;
    }
    setStep(2);
    setAppointmentData(null);
    setSpecialization(null);
    setActiveIndex(null);
    setDoctor(null);
    setOrganization(null);
    dispatch(clearShedule());
    dispatch(clearProfileSpecs());
  };

  const onPressThree = () => {
    if (step < 2 || !doctor) {
      return;
    }
    setStep(3);
    goToSelectDate();
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
        goToHistory={goToHistory}
        appointmentError={appointmentError}
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
