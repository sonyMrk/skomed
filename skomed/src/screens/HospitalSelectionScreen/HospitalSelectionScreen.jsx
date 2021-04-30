import React, { useEffect, useState, useCallback } from "react";
import { StyleSheet, View, Platform, Alert, ScrollView } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { AntDesign } from "@expo/vector-icons";
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

export const HospitalSelectionScreen = ({ navigation, navigateTo }) => {
  const isHouseCall = navigateTo === "ConfirmHouseCallScreen"; // запись на прием или вызов врача на дом

  const [access, setAccess] = useState(false);
  const [organization, setOrganization] = useState(null); // выбранная мед. организация
  const [iin, setIin] = useState(userIin); // Значение ИИН в форме

  const dispatch = useDispatch();

  const userIin = useSelector((state) => state.user.profile?.iin);
  const profileFamily = useSelector((state) => state.user.profile?.family);
  const profilePhone = useSelector((state) => state.user.profile?.phone);

  const isHospitalLoading = useSelector((state) => state.hospitals.isLoading);
  const hospitalsForAppointment = useSelector(
    (state) => state.hospitals.hospitalsForAppointment
  );
  const hospitalsLoadError = useSelector(
    (state) => state.hospitals.errorMessage
  );

  const appointmentUserData = useSelector(
    (state) => state.appointment.userData
  );
  const isLoadingUserData = useSelector(
    (state) => state.appointment.isLoadingUserData
  );

  // действия при первом рэндеринге
  useEffect(() => {
    setIin(userIin);
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
    // если выбрана организация и получены данные о пациенте:
    if (organization && appointmentUserData) {
      // Проверяем, если запись в поликлинику прикрепления:
      if (organization.OrgID === "0") {
        appointmentUserData.ErrorCode !== 0 // проверяем есть ли ошибки
          ? showError(
              // иначе выводим ошибку
              "Запись недоступна",
              appointmentUserData.ErrorDesc
            )
          : appointmentUserData.RegAvailable !== 1 ||
            appointmentUserData.HomeCallAvailable !== 1 // Если запись запрещена:
          ? showError(
              //  выводим ошибку
              "Запись недоступна",
              "В настоящий момент запись в МО прикрепления пациента не возможна!"
            )
          : setAccess(true); // иначе устанавливаем флаг
      } else {
        // Проверяем, если ли запреты на запись
        const errorUser = appointmentUserData?.OrgErrors?.find(
          (orgError) => orgError.OrgID === organization.OrgID
        );

        if (errorUser) {
          showError(
            "Запись недоступна по следующим причинам:",
            errorUser.ErrorText
          );
        } else {
          setAccess(true);
        }
      }
    }
  }, [appointmentUserData, organization, iin]);

  // TODO: Попробовать сделать сброс выбора члена семьи,
  // если после выбора члена семьи изменяется ИИН

  const showError = (title, errorMessage) => {
    return Alert.alert(title, errorMessage);
  };

  const fetchData = () => {
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
  };

  const handleChangeIin = (iin) => {
    dispatch(clearUserData());
    setIin(iin);
    setAccess(false);
  };

  const handleChangeOrganization = (org) => {
    if (org.ShowMessage) {
      showError("Кабинет пациента", org.MessageText);
    }
    setOrganization(org);
    setAccess(false);
  };

  if (isHospitalLoading) {
    return <Preloader />;
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <AppBoldText style={styles.title}>Выбор мед организации</AppBoldText>
          {/* Выводим ошибки */}
          {hospitalsLoadError ? (
            <AppBoldText style={styles.error}>{hospitalsLoadError}</AppBoldText>
          ) : hospitalsForAppointment?.ErrorDesc ? (
            <AppBoldText style={styles.error}>
              {hospitalsForAppointment.ErrorDesc}
            </AppBoldText>
          ) : null}
        </View>
        {hospitalsForAppointment && (
          <View style={styles.select}>
            <RNPickerSelect
              placeholder={{
                label: "Выбрать мед. учреждение",
                value: null,
                color: THEME.MAIN_COLOR,
              }}
              value={organization}
              onValueChange={handleChangeOrganization}
              items={
                isHouseCall
                  ? hospitalsForAppointment.Orgs.slice(0, 1)
                  : hospitalsForAppointment.Orgs
              }
              useNativeAndroidPickerStyle={false}
              style={{
                ...pickerSelectStyles,
              }}
              Icon={() => (
                <AntDesign name="medicinebox" size={20} color="white" />
              )}
            />
          </View>
        )}
        <View style={styles.input}>
          <AppTextInput
            placeholder="Введите ИИН"
            value={iin}
            onChange={setIin}
            type="numeric"
          />
        </View>
        {profileFamily && profileFamily.length > 0 && (
          <View style={styles.select}>
            <RNPickerSelect
              placeholder={{
                label: "Выбрать из членов семьи",
                value: null,
                color: THEME.MAIN_COLOR,
              }}
              onValueChange={handleChangeIin}
              items={[{ label: "Вы", value: userIin }, ...profileFamily]}
              useNativeAndroidPickerStyle={false}
              style={{
                ...pickerSelectStyles,
              }}
              Icon={() => <Ionicons name="people" size={20} color="white" />}
            />
          </View>
        )}
        {isLoadingUserData ? (
          <Preloader />
        ) : (
          appointmentUserData && <InfoBlock infoData={appointmentUserData} />
        )}
        <View style={styles.footer}>
          <AppButton onPress={fetchData} disabled={isLoadingUserData}>
            Проверить
          </AppButton>
          <AppButton
            onPress={() => {
              navigation.navigate(navigateTo, {
                iin,
                organization,
                profilePhone,
                appointmentUserData: isHouseCall ? {} : appointmentUserData, // если вызов на дом то данные о пациенте не нужны
              });
            }}
            disabled={!access}
          >
            Далее
          </AppButton>
        </View>
        <View style={styles.footer}>
          <AppButton
            wrapperStyle={{ width: "100%" }}
            onPress={() => navigation.navigate("SupportedHospitals")}
          >
            Посмотреть список доступных организаций
          </AppButton>
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
    paddingVertical: 10,
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
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
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
