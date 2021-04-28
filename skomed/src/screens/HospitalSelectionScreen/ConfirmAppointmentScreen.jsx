import React, { useEffect, useState } from "react";
import { StyleSheet, View, Platform, Alert, ScrollView } from "react-native";
import CheckBox from "@react-native-community/checkbox";
import RNPickerSelect from "react-native-picker-select";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

import { AppBoldText } from "../../components/ui/AppBoldText";
import { THEME } from "../../theme";
import { AppTextInput } from "../../components/ui/AppTextInput";
import { AppButton } from "../../components/ui/AppButton";
import { InfoBlock } from "../../components/InfoBlock";
import { Preloader } from "../../components/ui/Preloader";

// "IIN" - строка, ИИН записываемого пациента.
// "OrgID" - строка, ИД организации (значение поля "AttachmentID" из метода "GetPatientByIIN")
// "DoctorID" - строка, идентификатор участкового врача
// "CabinetID" - строка, идентификатор кабинета, в котором врач ведет прием
// "Date" - строка, дата приема в формате "yyyyMMdd"
// "TimeStart" - строка, время начала приема в формате "HH:mm"
// "TimeEnd" - строка, время окончания приема в формате "HH:mm"
// "RecordingMethod" - число, значения
// 1 - запись через мобильное приложение,
// 2 - запись через сайт,
// 3 - запись через терминал,
// "Language" - число, флаг языка в сообщениях от сервера
// 1 - русский,
// 2 - казахский

export const ConfirmAppointmentScreen = ({ navigation, route }) => {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const iin = route.params.iin;
  const organization = route.params.organization;
  const appointmentUserData = route.params.appointmentUserData;
  const profilePhone = route.params.profilePhone;

  console.log("toggleCheckBox", toggleCheckBox);
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <AppBoldText style={styles.title}>Тип специалиста</AppBoldText>
        </View>
        <View style={styles.checkbox}>
          <CheckBox
            style={styles.checkboxInput}
            disabled={false}
            value={toggleCheckBox}
            onValueChange={(newValue) => setToggleCheckBox(newValue)}
          />
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
  checkbox: {
    marginBottom: 15,
  },
  checkboxInput: {
    borderColor: THEME.DANGER_COLOR,
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
