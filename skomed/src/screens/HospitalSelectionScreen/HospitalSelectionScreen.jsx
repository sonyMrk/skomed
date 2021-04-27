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
import { getAppointmentUserData } from "../../store/actions/appointment";

// const infoUserData = {
//   FIO: "Печёнкин Александр Сергеевич",
//   Territory: "Участок №1 общей практики",
//   TerritoryID: "100500",
//   Attachment: "КГП на ПХВ Третья поликлиника УЗ СКО",
//   AttachmentID: "350750",
//   AttachmentAddress: "г. Петропавловск. ул. Больничная д. 34",
//   Doctor: "Айболитов Доктор Докторович",
//   DoctorID: 654789654123,
//   ErrorCode: 0,
//   ErrorDesc: "",
// };

// const organizations = {
//   ErrorDesc: "",
//   ErrorCode: 0,
//   Orgs: [
//     {
//       OrgID: 1,
//       Name: "Поликлиника прикрепления",
//       ShowMessage: true,
//       MessageText: "MessageText",
//       DisableDoctorSelection: true,
//     },
//     {
//       OrgID: 2,
//       Name: "Взрослая областная",
//       ShowMessage: true,
//       MessageText: "MessageText",
//       DisableDoctorSelection: true,
//     },
//     {
//       OrgID: 3,
//       Name: "Есиль-диагностик(офтальм.центр)",
//       ShowMessage: true,
//       MessageText: "MessageText",
//       DisableDoctorSelection: true,
//     },
//     {
//       OrgID: 4,
//       Name: "Областная стоматологическая поликлиника",
//       ShowMessage: true,
//       MessageText: "MessageText",
//       DisableDoctorSelection: false,
//     },
//   ],
// };

// const family = [
//   // { label: "Пупкин Иван Вячеславович", value: "12345678asdasdas" },
//   // { label: "Иванов Иван Васильевич", value: "910414360903" },
//   // { label: "Букин Геннадий Батькович", value: "910414360904" },
//   // { label: "Сидоров Василий Петрович", value: "910414360906" },
// ];

export const HospitalSelectionScreen = ({ navigation, navigateTo }) => {
  const [access, setAccess] = useState(false); // Найден ли нужный ИИН
  const [organization, setOrganization] = useState(null); // ID мед. организации
  const [iin, setIin] = useState(userIin); // Значение ИИН в форме
  const [infoData, setInfoData] = useState(null);

  const dispatch = useDispatch();

  const userIin = useSelector((state) => state.user.profile?.iin);
  const profileFamily = useSelector((state) => state.user.profile?.family);

  const isHospitalLoading = useSelector((state) => state.hospitals.isLoading);
  const hospitalsResp = useSelector((state) => state.hospitals.hospitals);

  const appointmentUserData = useSelector((state) => state.appointment.userData)
  const appointmentLoading = useSelector((state) => state.appointment.isLoading)

  // преобразуем данные в нужный формат
  const family = profileFamily
    ? profileFamily.reduce(
        (prev, person) => [...prev, { label: person.name, value: person.iin }],
        []
      )
    : [];

  // преобразуем данные в нужный формат
  const hospitals = hospitalsResp.Orgs
    ? hospitalsResp.Orgs.reduce(
        (prev, org) => [...prev, { label: org.Name, value: org }],
        []
      )
    : [];


  useEffect(() => {
    setIin(userIin);
    dispatch(getHospitals());
    setOrganization(hospitals[0])
  }, []);

  // TODO: Попробовать сделать сброс выбора члена семьи,
  // если после выбора члена семьи изменяется ИИН

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
    dispatch(getAppointmentUserData(iin))
    console.log("appointmentUserData===", appointmentUserData)
  };

  if (isHospitalLoading) {
    return <Preloader />;
  }


  // ОШИБКА С ДЕДОМ!

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <AppBoldText style={styles.title}>Выбор мед организации</AppBoldText>
        </View>
        <View style={styles.select}>
          <RNPickerSelect
            placeholder={{}}
            value={organization}
            onValueChange={(value) => setOrganization(value)}
            items={hospitals}
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
              onValueChange={(value) => setIin(value)}
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
        ) : appointmentUserData && <InfoBlock infoData={appointmentUserData} />}
        <View style={styles.footer}>
          <AppButton onPress={fetchData}>Проверить</AppButton>
          <AppButton
            onPress={() => {
              navigation.navigate(navigateTo, { iin, organization });
            }}
            disabled={!access}
          >
            Далее
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
