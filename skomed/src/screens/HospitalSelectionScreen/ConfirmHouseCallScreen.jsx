import React, { useEffect, useState } from "react";
import { StyleSheet, View, Alert, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { AppBoldText } from "../../components/ui/AppBoldText";
import { THEME } from "../../theme";
import { AppTextInput } from "../../components/ui/AppTextInput";
import { AppButton } from "../../components/ui/AppButton";
import { AppText } from "../../components/ui/AppText";
import { Preloader } from "../../components/ui/Preloader";
import { defaultFormatDate } from "../../utils/formatDate";
import {
  getSaveAppointmentLoadingState,
  getAppointmentErrorMessageState,
  getAppointmentHouseCallResultState,
} from "../../store/selectors/appointment";
import { saveHouseCall, clearAppointmentSaveResult, clearHouseCallResult, clearAppointmentError } from "../../store/actions/appointment";

export const ConfirmHouseCallScreen = ({ navigation, route }) => {
  const [visibleInfo, setVisibleInfo] = useState(true)

  const iin = route.params.iin;
  const appointmentUserData = route.params.appointmentUserData;
  const profilePhone = route.params.profilePhone;


  const appointmentError = useSelector(getAppointmentErrorMessageState)
  const saveHouseCallResult = useSelector(getAppointmentHouseCallResultState);
  const saveAppointmentLoading = useSelector(getSaveAppointmentLoadingState)

  const [phone, setPhone] = useState(profilePhone);
  const [reason, setReason] = useState("");

  const dispatch = useDispatch()

  const callDoctor = () => {
    setVisibleInfo(false)
    
    const info = {
      orgName: appointmentUserData.Attachment,
      doctorName: appointmentUserData.Doctor,
      patientName: appointmentUserData.FIO
    };

    dispatch(saveHouseCall(info, iin, appointmentUserData.AttachmentID, phone, reason, 1, 1))
  };

  useEffect(() => {
    dispatch(clearAppointmentError())
    Alert.alert(
      "Справка",
      `
      Показания для обслуживания на дому участковой медицинской сестры или фельдшера:
      1)	температура тела до 38⁰С
      2)	повышение артериального давления
      3) заболевание, травма (без резкого ухудшения состояния)

    Показания для обслуживания на дому участковым врачом:
      1)	контакт с инфекционным больным
      2)	температура тела выше 38⁰С
      3)	сыпь на теле без причины
      4)	инфекционное заболевание
      5)	ухудшение состояния после прививки
      6)	ребенок до 5-ти лет
      7)	ухудшение состояния при беременности
      8)	ухудшение состояния у родильницы
    `
    );
    return () => {
      dispatch(clearAppointmentSaveResult())
      dispatch(clearHouseCallResult())
    }
  }, []);

  if(saveAppointmentLoading) {
    return <Preloader />
  }

  if(saveHouseCallResult) {
    return (
      <View style={styles.result}>
        <AppBoldText style={styles.result__text}>
          Дата {saveHouseCallResult.RegDateTime}
        </AppBoldText>
        <AppButton onPress={() => { navigation.navigate("History") }}>
          Перейти к истории записей
        </AppButton>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <AppBoldText style={styles.title}>Вызов врача на дом</AppBoldText>
          {appointmentError && (
            <AppBoldText style={styles.error}>
              {appointmentError}
            </AppBoldText>
          )}
        </View>
        <View style={styles.date}>
          <AppText>Дата вызова</AppText>
          <AppText>{defaultFormatDate(new Date())}</AppText>
        </View>
        {visibleInfo && <View style={styles.info}>
          <AppBoldText
            style={{ color: THEME.DANGER_COLOR, textAlign: "center" }}
          >
            Внимание! Обязательно укажите корректый номер телефона, по которому
            доктор сможет связаться с пациентом и подтвердить свой визит.
          </AppBoldText>
        </View>}
        <View style={styles.input}>
          <AppBoldText style={{ textAlign: "center" }}>
            Телефон пациента
          </AppBoldText>
          <AppTextInput
            placeholder="Телефон пациента"
            value={phone}
            onChange={setPhone}
            type="phone-pad"
            maxLength={12}
            style={{ marginTop: 10 }}
          />
        </View>
        <View style={styles.input}>
          <AppBoldText style={{ textAlign: "center" }}>
            Причина вызова
          </AppBoldText>
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
        <AppButton onPress={callDoctor}>Вызвать врача</AppButton>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
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
  title: {
    textAlign: "center",
    fontSize: 18,
  },
  date: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  info: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  input: {
    marginBottom: 15,
  },
  error: {
    textAlign: "center",
    color: THEME.DANGER_COLOR,
  },
});
