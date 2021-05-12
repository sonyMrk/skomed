import React, { useEffect, useState } from "react";
import { StyleSheet, View, Alert, ScrollView } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { Ionicons } from "@expo/vector-icons";

import { useDispatch, useSelector } from "react-redux";

import { AppBoldText } from "../../components/ui/AppBoldText";
import { THEME } from "../../theme";
import { AppTextInput } from "../../components/ui/AppTextInput";
import { AppButton } from "../../components/ui/AppButton";
import { InfoBlock } from "../../components/InfoBlock";
import { Preloader } from "../../components/ui/Preloader";
import {
  clearHospitalsError,
  getHospitalsForAppointment,
  clearHospitalsForAppointment,
} from "../../store/actions/hospitals";
import {
  getAppointmentUserData,
  clearUserData,
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
} from "../../store/selectors/appointment";
import {
  getUserIINState,
  getUserFamilyState,
  getUserPhoneState,
} from "../../store/selectors/user";

export const RegistrationForVaccination = ({ navigation }) => {
  const [access, setAccess] = useState(false);
  const [iinInputValue, setIinInputValue] = useState(userIin); // Значение ИИН в форме
  const [showSupportedHospitals, setShowSupportedHospitals] = useState(false);

  const dispatch = useDispatch();

  const userIin = useSelector(getUserIINState);
  const profileFamily = useSelector(getUserFamilyState);
  const profilePhone = useSelector(getUserPhoneState);

  const isHospitalLoading = useSelector(getHospitalsLoadingState);
  const hospitalsForAppointment = useSelector(getHospitalsForAppointmentState);
  const hospitalsLoadError = useSelector(getHospitalsErrorState);

  const appointmentUserData = useSelector(getAppointmentUserDataState);
  const appointmentError = useSelector(getAppointmentErrorMessageState);
  const isLoadingUserData = useSelector(getAppointmentUserDataLoadingState);

  // действия при первом рэндеринге
  useEffect(() => {
    if (userIin) {
      setIinInputValue(userIin);
      fetchData(userIin);
    }
    dispatch(getHospitalsForAppointment()); // получаем список организаций где разрешена запись
    return () => {
      // действия при анмаунте
      dispatch(clearUserData());
      dispatch(clearHospitalsError());
      dispatch(clearHospitalsForAppointment());
      setAccess(false);
    };
  }, []);

  useEffect(() => {
    // если получены данные о пациенте:
    if (appointmentUserData) {
      if (appointmentUserData.ErrorCode !== 0) {
        showError(
          // выводим ошибку
          "Запись недоступна",
          appointmentUserData.ErrorDesc
        );
      } else if (
        // если запрещен вызов врача на дом и запись на прием
        appointmentUserData.RegAvailable !== 1 ||
        appointmentUserData.HomeCallAvailable !== 1
      ) {
        setShowSupportedHospitals(true);
        showError(
          //  выводим ошибку
          "Запись недоступна",
          "В настоящий момент запись в МО прикрепления пациента не возможна!"
        );
      } else {
        setAccess(true); // иначе устанавливаем флаг
      }
    }
  }, [appointmentUserData]);

  const showError = (title, errorMessage) => {
    return Alert.alert(title, errorMessage);
  };

  const fetchData = (iin) => {
    if (!iin) {
      return Alert.alert("Не корректный ИИН", "Введите ИИН");
    }
    if (iin.trim().length !== 12 || isNaN(iin)) {
      return Alert.alert(
        "Не корректный ИИН",
        "Значение ИИН должно быть 12 цифр"
      );
    }
    dispatch(getAppointmentUserData(iin));
    setShowSupportedHospitals(false);
  };

  // обработчик выбора ИИН из членов семьи
  const handleFamilyChangeIin = (value) => {
    dispatch(clearUserData());
    setIinInputValue(value);
    setAccess(false);
    fetchData(value);
  };

  const handleEndEditInn = () => {
    dispatch(clearUserData());
    setAccess(false);
    fetchData(iinInputValue);
  };

  if (isHospitalLoading) {
    return <Preloader />;
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          {/* Выводим ошибки */}
          {hospitalsLoadError ? (
            <AppBoldText style={styles.error}>{hospitalsLoadError}</AppBoldText>
          ) : hospitalsForAppointment?.ErrorDesc !== 0 ? (
            <AppBoldText style={styles.error}>
              {hospitalsForAppointment?.ErrorDesc}
            </AppBoldText>
          ) : appointmentError ? (
            <AppBoldText style={styles.error}>{appointmentError}</AppBoldText>
          ) : null}
        </View>
        <View style={styles.input}>
          <AppTextInput
            placeholder="Введите ИИН"
            value={iinInputValue}
            onChange={setIinInputValue}
            type="numeric"
            onEndEditing={handleEndEditInn}
            maxLength={12}
          />
        </View>
        {profileFamily && profileFamily.length > 0 && (
          <View style={styles.select}>
            <RNPickerSelect
              fixAndroidTouchableBug={true}
              placeholder={{
                label: "Выбрать из членов семьи",
                value: null,
                color: THEME.MAIN_COLOR,
              }}
              onValueChange={handleFamilyChangeIin}
              items={[{ label: "Вы", value: userIin }, ...profileFamily]}
              useNativeAndroidPickerStyle={false}
              style={{
                ...pickerSelectStyles,
              }}
              // Icon={() => <Ionicons name="people" size={20} color="white" />}
            />
          </View>
        )}
        {isLoadingUserData ? (
          <Preloader />
        ) : (
          appointmentUserData && <InfoBlock infoData={appointmentUserData} />
        )}
        <View style={styles.footer}>
          <AppButton
            onPress={() => {
              navigation.navigate("ConfirtmRegForVaccination", {
                iin: iinInputValue,
                profilePhone,
                appointmentUserData,
              });
            }}
            disabled={!access}
          >
            Далее
          </AppButton>
        </View>
        <View style={styles.footer}>
          {showSupportedHospitals && (
            <AppButton
              wrapperStyle={{ width: "100%" }}
              onPress={() => navigation.navigate("SupportedHospitals")}
            >
              Посмотреть список доступных организаций
            </AppButton>
          )}
        </View>
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
    paddingVertical: 5,
  },
  title: {
    textAlign: "center",
    fontSize: 18,
  },
  error: {
    color: THEME.DANGER_COLOR,
    fontSize: 18,
    textAlign: "center",
  },
  select: {
    marginBottom: 15,
  },
  input: {
    marginBottom: 15,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 20,
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
