import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { Ionicons } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";

import { AppBoldText } from "../../components/ui/AppBoldText";
import { THEME } from "../../theme";
import { AppTextInput } from "../../components/ui/AppTextInput";
import { AppButton } from "../../components/ui/AppButton";
import { ProfileInfoItem } from "../../components/InfoBlock";
import { Preloader } from "../../components/ui/Preloader";
import { AppText } from "../../components/ui/AppText";
import {
  getShedule,
  clearShedule,
  getProfileSpecsData,
  clearProfileSpecs,
} from "../../store/actions/appointment";

export const ConfirmAppointmentScreen = ({ navigation, route }) => {
  const [profileSpecialistCheckbox, setProfileSpecialistCheckbox] = useState(
    false
  );
  const [appointmentTime, setAppointmentTime] = useState(null); // время приема
  const [appointmentData, setAppointmentData] = useState(null); // данные (id кабинета, массив свободныч часов, даты и т.д)
  const [reason, setReason] = useState(""); // причина визита

  const [specialization, setSpecialization] = useState(null); // специализация обьект с массивом врачей, id, name, коды ошибок
  const [doctor, setDoctor] = useState(null); // обьект с доктором {"Doctor" : "", "DoctorID"}

  const iin = route.params.iin;
  const organization = route.params.organization;
  const appointmentUserData = route.params.appointmentUserData;
  const profilePhone = route.params.profilePhone;

  const dispatch = useDispatch();

  const shedule = useSelector((state) => state.appointment.shedule);
  const profileSpecsData = useSelector(
    (state) => state.appointment.profileSpecsData
  );

  const isLoadingShedule = useSelector(
    (state) => state.appointment.isLoadingShedule
  );
  const isLoadingProfileSpecs = useSelector(
    (state) => state.appointment.isLoadingProfileSpecs
  );

  const handleChangeProfileSpecialist = (value) => {
    setProfileSpecialistCheckbox(value);
    setAppointmentTime(null);
  };

  const handleChangeSpecialization = (value) => {
    setSpecialization(value);
  };

  const handleChangeDoctor = (value) => {
    setDoctor(value);
    const orgId =
      organization.OrgID === "0"
        ? appointmentUserData.AttachmentID
        : organization.OrgID;
    const doctorId = value?.DoctorID;
    const profileId = specialization.GUID;
    if (doctorId) {
      dispatch(getShedule(orgId, doctorId, profileId));
    }
  };

  const handleChangeDate = (data) => {
    setAppointmentTime(null);
    setAppointmentData(data);
  };

  const saveAppointment = () => {
    console.log("Запись на прием сохранена...");
  };

  useEffect(() => {
    let orgId;
    let doctorId;

    if (organization.OrgID === "0") {
      // если выбрана поликлиника прикрепления
      orgId = appointmentUserData.AttachmentID;
      if (!profileSpecialistCheckbox) {
        // если в поликлинике прикрепления не выбраны узкие специалисты
        doctorId = appointmentUserData.DoctorID;
        dispatch(getShedule(orgId, doctorId));
      } else {
        dispatch(getProfileSpecsData(orgId));
      }
    } else {
      orgId = organization.OrgID;
      if (organization.DisableDoctorSelection) {
        dispatch(getShedule(orgId));
      } else {
        dispatch(getProfileSpecsData(orgId));
      }
      // если другая мед организация
    }

    return () => {
      dispatch(clearShedule());
      dispatch(clearProfileSpecs());
    };
  }, [profileSpecialistCheckbox]);

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <AppBoldText style={styles.title}>
            Запись на прием к врачу
          </AppBoldText>
        </View>
        {/* Если в организации не стоит запрет на выбор врача при записи */}
        {!organization.DisableDoctorSelection && organization.OrgID === "0" && (
          <View>
            {/* Если в организации доступна запись к узким специалистам */}
            {appointmentUserData.RegToProfileSpecs && (
              <View style={styles.toggleProfile}>
                <View style={styles.checkboxWrapper}>
                  <TouchableOpacity
                    onPress={() => handleChangeProfileSpecialist(false)}
                    activeOpacity={0.5}
                  >
                    <View
                      style={[
                        styles.checkbox,
                        !profileSpecialistCheckbox ? styles.activeCheckbox : {},
                      ]}
                    >
                      <AppText
                        style={{
                          textAlign: "center",
                          color: !profileSpecialistCheckbox ? "#fff" : "#000",
                        }}
                      >
                        Запись к участковому
                      </AppText>
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={styles.checkboxWrapper}>
                  <TouchableOpacity
                    onPress={() => handleChangeProfileSpecialist(true)}
                    activeOpacity={0.5}
                  >
                    <View
                      style={[
                        styles.checkbox,
                        profileSpecialistCheckbox ? styles.activeCheckbox : {},
                      ]}
                    >
                      <AppText
                        style={{
                          textAlign: "center",
                          color: profileSpecialistCheckbox ? "#fff" : "#000",
                        }}
                      >
                        Запись к узким специалистам
                      </AppText>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            )}
            {/* Если не выбран пункт к узким специалистам */}
            {!profileSpecialistCheckbox && (
              <View style={styles.info}>
                <ProfileInfoItem
                  title="Ф.И.О"
                  value={appointmentUserData.FIO}
                />
                <ProfileInfoItem
                  title="Участковый врач"
                  value={appointmentUserData.Doctor}
                />
              </View>
            )}
          </View>
        )}
        {/* Если загружается профили специализаций показываем прелоадер */}
        {isLoadingProfileSpecs ? (
          <Preloader />
        ) : (
          // иначе, если данные специализаций загружены то показываем селекты с выбором специализаций и врача
          profileSpecsData && (
            <View style={styles.profileActions}>
              <View style={styles.header}>
                <AppText style={styles.subtitle}>
                  Выберите специализацию
                </AppText>
              </View>
              <RNPickerSelect
                placeholder={{
                  label: "Выберите специализацию:",
                  value: null,
                  color: THEME.MAIN_COLOR,
                }}
                value={specialization}
                onValueChange={handleChangeSpecialization}
                items={
                  profileSpecsData?.Profiles ? profileSpecsData?.Profiles : []
                }
                useNativeAndroidPickerStyle={false}
                style={{
                  ...pickerSelectStyles,
                }}
                Icon={() => <EvilIcons name="gear" size={20} color="white" />}
              />
              <View style={styles.header}>
                <AppText style={styles.subtitle}>Выберите врача</AppText>
              </View>
              <RNPickerSelect
                placeholder={{
                  label: "Выберите врача:",
                  value: null,
                  color: THEME.MAIN_COLOR,
                }}
                value={doctor}
                onValueChange={handleChangeDoctor}
                items={
                  specialization?.Specialists ? specialization?.Specialists : []
                }
                useNativeAndroidPickerStyle={false}
                style={{
                  ...pickerSelectStyles,
                }}
                Icon={() => (
                  <MaterialCommunityIcons
                    name="doctor"
                    size={20}
                    color="white"
                  />
                )}
              />
            </View>
          )
        )}
        {/* Если загружается расписание врача то показываем прелоадер, иначе, если уже есть расписание то селекты с выбором даты и времени */}
        {isLoadingShedule ? (
          <Preloader />
        ) : (
          shedule && (
            <View>
              <View style={styles.header}>
                <AppBoldText style={styles.title}>
                  Выберите дату и время приема
                </AppBoldText>
                <AppText style={styles.subtitle}>
                  *Выводятся только доступные для записи дата и время
                </AppText>
              </View>

              <View style={styles.select}>
                <RNPickerSelect
                  placeholder={{
                    label: "Дата приема",
                    value: null,
                    color: THEME.MAIN_COLOR,
                  }}
                  value={appointmentData}
                  onValueChange={handleChangeDate}
                  items={shedule?.Dates ? shedule.Dates : []}
                  useNativeAndroidPickerStyle={false}
                  style={{
                    ...pickerSelectStyles,
                  }}
                  Icon={() => (
                    <Ionicons name="calendar-outline" size={20} color="white" />
                  )}
                />
              </View>
              <View style={styles.select}>
                <RNPickerSelect
                  placeholder={{
                    label: "Время приема",
                    value: null,
                    color: THEME.MAIN_COLOR,
                  }}
                  value={appointmentTime}
                  onValueChange={setAppointmentTime}
                  items={appointmentData?.Times ? appointmentData.Times : []}
                  useNativeAndroidPickerStyle={false}
                  style={{
                    ...pickerSelectStyles,
                  }}
                  Icon={() => (
                    <Ionicons name="time-outline" size={20} color="white" />
                  )}
                />
              </View>
            </View>
          )
        )}
        <View>
          <View style={styles.header}>
            <AppBoldText style={styles.title}>Причина визита</AppBoldText>
          </View>
          <View style={styles.input}>
            <AppTextInput
              placeholder="Причина вызова"
              value={reason}
              onChange={setReason}
              multiline={true}
              numberOfLines={4}
              autoCapitalize="sentences"
              style={{ height: 90, marginTop: 10 }}
            />
          </View>
        </View>
        <AppButton onPress={saveAppointment} disabled={!appointmentTime}>
          Записаться на прием
        </AppButton>
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
  info: {
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderRadius: 10,
  },
  select: {
    marginVertical: 10,
  },
  input: {
    marginBottom: 15,
  },
  text: {
    textAlign: "center",
  },
  subtitle: {
    textAlign: "center",
    color: THEME.GRAY_COLOR,
  },
  profileActions: {},
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
