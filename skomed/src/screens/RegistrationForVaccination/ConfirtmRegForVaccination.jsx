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
import { InfoItem } from "../../components/ui/InfoItem";
import { Preloader } from "../../components/ui/Preloader";
import { AppText } from "../../components/ui/AppText";
import {
  getShedule,
  clearShedule,
  getProfileSpecsData,
  clearProfileSpecs,
} from "../../store/actions/appointment";
import {
  getAppointmentProfileSpecDataState,
  getAppointmentSheduleState,
  getAppointmentSheduleLoadingState,
  getAppointmentProfileSpecLoadingState,
} from "../../store/selectors/appointment";

export const ConfirtmRegForVaccination = ({ navigation, route }) => {
  const [appointmentTime, setAppointmentTime] = useState(null); // время приема
  const [appointmentData, setAppointmentData] = useState(null); // данные (id кабинета, массив свободныч часов, даты и т.д)

  const [specialization, setSpecialization] = useState(null); // специализация обьект с массивом врачей, id, name, коды ошибок
  const [doctor, setDoctor] = useState(null); // обьект с доктором {"Doctor" : "", "DoctorID"}

  const iin = route.params.iin;
  const appointmentUserData = route.params.appointmentUserData;
  const profilePhone = route.params.profilePhone;

  const dispatch = useDispatch();

  const shedule = useSelector(getAppointmentSheduleState);
  const profileSpecsData = useSelector(getAppointmentProfileSpecDataState);

  const isLoadingShedule = useSelector(getAppointmentSheduleLoadingState);
  const isLoadingProfileSpecs = useSelector(
    getAppointmentProfileSpecLoadingState
  );

  const handleChangeSpecialization = (value) => {
    setSpecialization(value);
    setDoctor(null);
  };

  const handleChangeDoctor = (value) => {
    setDoctor(value);
    const orgId = appointmentUserData.AttachmentID;
    const doctorId = value?.DoctorID; // может быть null если выбран placeholder
    const profileId = specialization.GUID;
    if (doctorId) {
      dispatch(getShedule(orgId, doctorId, profileId));
    }
  };

  const handleChangeDate = (data) => {
    setAppointmentTime(null); // сбрасывать время при изменении даты
    setAppointmentData(data);
  };

  const saveAppointment = () => {
    Alert.alert("Запись на вакцину сохранена...");
  };

  useEffect(() => {
    dispatch(getProfileSpecsData(appointmentUserData.AttachmentID));
    return () => {
      dispatch(clearShedule());
      dispatch(clearProfileSpecs());
    };
  }, []);

  useEffect(() => {
    showAlert();
  }, []);

  const showAlert = () =>
    Alert.alert(
      "Какое то предупреждение",
      "Если нажать ОК, то можно продолжать, если ОТМЕНА то вернемся на главную",
      [
        {
          text: "Отмена",
          onPress: () => {
            navigation.navigate("Main");
          },
          style: "cancel",
        },
        {
          text: "Ок",
          onPress: () => {
            Alert.alert("Вы ознакомились со всеми предупреждениями");
          },
          style: "default",
        },
      ],
      {
        cancelable: true,
        onDismiss: () =>
          Alert.alert("Вы ознакомились со всеми предупреждениями"),
      }
    );

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <AppBoldText style={styles.title}>Запись на вакцинацию</AppBoldText>
          {shedule?.ErrorCode !== 0 && (
            <AppBoldText style={styles.error}>{shedule?.ErrorDesc}</AppBoldText>
          )}
          {profileSpecsData?.ErrorCode !== 0 && (
            <AppBoldText style={styles.error}>
              {profileSpecsData?.ErrorDesc}
            </AppBoldText>
          )}
        </View>
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
                fixAndroidTouchableBug={true}
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
                // Icon={() => <EvilIcons name="gear" size={20} color="white" />}
              />
              <View style={styles.header}>
                <AppText style={styles.subtitle}>Выберите врача</AppText>
              </View>
              <RNPickerSelect
                fixAndroidTouchableBug={true}
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
                // Icon={() => (
                //   <MaterialCommunityIcons
                //     name="doctor"
                //     size={20}
                //     color="white"
                //   />
                // )}
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
                  fixAndroidTouchableBug={true}
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
                  // Icon={() => (
                  //   <Ionicons name="calendar-outline" size={20} color="white" />
                  // )}
                />
              </View>
              <View style={styles.select}>
                <RNPickerSelect
                  fixAndroidTouchableBug={true}
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
                  // Icon={() => (
                  //   <Ionicons name="time-outline" size={20} color="white" />
                  // )}
                />
              </View>
            </View>
          )
        )}
        <AppButton
          onPress={saveAppointment}
          disabled={!appointmentTime}
          style={{ marginTop: 20 }}
        >
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
