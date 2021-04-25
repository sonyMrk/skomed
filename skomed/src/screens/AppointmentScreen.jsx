import React, { useEffect, useState } from "react";
import { StyleSheet, View, Platform, Alert } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

import { AppBoldText } from "../components/ui/AppBoldText";
import { THEME } from "../theme";
import { AppTextInput } from "../components/ui/AppTextInput";
import { AppButton } from "../components/ui/AppButton";

const organizations = [
  { label: "Поликлиника прикрепления", value: 1 },
  { label: "Взрослая областная", value: 2 },
  { label: "Есиль-диагностик(офтальм.центр)", value: 3 },
  { label: "Областная стоматологическая поликлиника", value: 4 },
];

const family = [
  { label: "Пупкин Иван Вячеславович", value: "12345678asdasdas" },
  { label: "Иванов Иван Васильевич", value: "910414360903" },
  { label: "Букин Геннадий Батькович", value: "910414360904" },
  { label: "Сидоров Василий Петрович", value: "910414360906" },
];

const userIin = null;

export const AppointmentScreen = ({ navigation }) => {
  const [access, setAccess] = useState(false); // Найден ли нужный ИИН
  const [organization, setOrganization] = useState(1); // ID мед. организации
  const [iin, setIin] = useState(userIin); // Значение ИИН в форме

  // TODO: Попробовать сделать сброс выбора члена семьи,
  // если после выбора члена семьи изменяется ИИН

  const fetchData = () => {
    if (iin.trim().length !== 12 || isNaN(iin)) {
      return Alert.alert(
        "Не корректный ИИН",
        "Значение ИИН должно быть 12 цифр"
      );
    }
    console.log({
      orgId: organization,
      iin,
    });
    setAccess(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <AppBoldText style={styles.title}>Выбор мед организации</AppBoldText>
      </View>
      <View style={styles.select}>
        <RNPickerSelect
          placeholder={{}}
          value={organization}
          onValueChange={(value) => setOrganization(value)}
          items={organizations}
          useNativeAndroidPickerStyle={false}
          style={{
            ...pickerSelectStyles,
          }}
          Icon={() => <AntDesign name="medicinebox" size={20} color="white" />}
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
      {family.length > 0 && (
        <View style={styles.select}>
          <RNPickerSelect
            placeholder={{
              label: "Выбрать из членов семьи",
              value: null,
              color: THEME.MAIN_COLOR,
            }}
            onValueChange={(value) => setIin(value)}
            items={family}
            useNativeAndroidPickerStyle={false}
            style={{
              ...pickerSelectStyles,
            }}
            Icon={() => <Ionicons name="people" size={20} color="white" />}
          />
        </View>
      )}
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <AppButton onPress={fetchData}>Проверить</AppButton>
        <AppButton
          onPress={fetchData}
          onPress={() => {
            console.log("sadasd");
          }}
          disabled={!access}
        >
          Далее
        </AppButton>
      </View>
    </View>
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
