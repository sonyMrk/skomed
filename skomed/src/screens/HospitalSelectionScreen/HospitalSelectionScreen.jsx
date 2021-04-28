import React, { useEffect, useState } from "react";
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
import { getHospitals } from "../../store/actions/hospitals";
import {
  getAppointmentUserData,
  clearUserData,
} from "../../store/actions/appointment";

export const HospitalSelectionScreen = ({ navigation, navigateTo }) => {
  const isHouseCall = navigateTo === "ConfirmHouseCallScreen"; // запись на прием или вызов врача на дом

  const [access, setAccess] = useState(false);
  const [organization, setOrganization] = useState(null); // ID мед. организации
  const [iin, setIin] = useState(userIin); // Значение ИИН в форме

  const dispatch = useDispatch();

  const userIin = useSelector((state) => state.user.profile?.iin);
  const profileFamily = useSelector((state) => state.user.profile?.family);
  const profilePhone = useSelector((state) => state.user.profile?.phone);

  const isHospitalLoading = useSelector((state) => state.hospitals.isLoading);
  const hospitalsList = useSelector((state) => state.hospitals.hospitals);
  const hospitalsLoadError = useSelector(
    (state) => state.hospitals.errorMessage
  );

  const appointmentUserData = useSelector(
    (state) => state.appointment.userData
  );
  const appointmentLoading = useSelector(
    (state) => state.appointment.isLoading
  );

  // преобразуем данные в нужный формат
  const family = profileFamily
    ? profileFamily.reduce(
        (prev, person) => [...prev, { label: person.name, value: person.iin }],
        []
      )
    : [];

  // преобразуем данные в нужный формат
  const hospitals = hospitalsList.Orgs
    ? hospitalsList.Orgs.reduce(
        (prev, org) => [...prev, { label: org.Name, value: org }],
        []
      )
    : [];
  // действия при первом рэндеринге
  useEffect(() => {
    setIin(userIin);
    dispatch(getHospitals()); // получаем список организаций где разрешена запись
    return () => {
      // действия при анмаунте
      dispatch(clearUserData());
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
          : appointmentUserData.RegAvailable !== 1 || appointmentUserData.HomeCallAvailable !== 1 // Если запись запрещена:
          ? showError(
              //  выводим ошибку
              "Запись недоступна",
              "В настоящий момент запись в МО прикрепления пациента не возможна!"
            )
          : setAccess(true); // иначе устанавливаем флаг
      } else {
        // Проверяем, если ли запреты на запись
        const errorUser = appointmentUserData.OrgErrors.find(
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

  const changeIin = (iin) => {
    dispatch(clearUserData());
    setIin(iin);
    setAccess(false);
  };

  const changeOrganization = (org) => {
    setOrganization(org);
    if (org.ShowMessage) {
      showError("Кабинет пациента", org.MessageText);
    }
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
          {hospitalsLoadError && (
            <AppBoldText style={{ color: THEME.DANGER_COLOR, fontSize: 18 }}>
              {hospitalsLoadError}
            </AppBoldText>
          )}
        </View>
        <View style={styles.select}>
          <RNPickerSelect
            placeholder={{
              label: "Выбрать мед. учреждение",
              value: null,
              color: THEME.MAIN_COLOR,
            }}
            value={organization}
            onValueChange={changeOrganization}
            items={isHouseCall ? hospitals.slice(0, 1) : hospitals}
            useNativeAndroidPickerStyle={false}
            style={{
              ...pickerSelectStyles,
            }}
            Icon={() => (
              <AntDesign name="medicinebox" size={20} color="white" />
            )}
          />
        </View>
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
              onValueChange={changeIin}
              items={[{ label: "Вы", value: userIin }, ...family]}
              useNativeAndroidPickerStyle={false}
              style={{
                ...pickerSelectStyles,
              }}
              Icon={() => <Ionicons name="people" size={20} color="white" />}
            />
          </View>
        )}
        {appointmentLoading ? (
          <Preloader />
        ) : (
          appointmentUserData && <InfoBlock infoData={appointmentUserData} />
        )}
        <View style={styles.footer}>
          <AppButton onPress={fetchData} disabled={appointmentLoading}>
            Проверить
          </AppButton>
          <AppButton
            onPress={() => {
              navigation.navigate(navigateTo, {
                iin,
                organization,
                profilePhone,
                appointmentUserData: isHouseCall ? {} : appointmentUserData    // если вызов на дом то данные о пациенте не нужны
              });
            }}
            disabled={!access}
          >
            Далее
          </AppButton>
        </View>
        <View style={styles.footer}>
          <AppButton
            onPress={() => navigation.navigate("SupportedHospitals")}
            style={{ width: "100%" }}
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
  select: {
    marginBottom: 15,
  },
  input: {
    marginBottom: 15,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
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
