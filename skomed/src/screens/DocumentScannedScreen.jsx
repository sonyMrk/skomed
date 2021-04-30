import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import RNPickerSelect from "react-native-picker-select";
import { AntDesign } from "@expo/vector-icons";

import {
  getAllHospitals,
  clearHospitalsError,
} from "../store/actions/hospitals";
import { Preloader } from "../components/ui/Preloader";
import { AppBoldText } from "../components/ui/AppBoldText";
import { THEME } from "../theme";
import { AppTextInput } from "../components/ui/AppTextInput";
import { AppButton } from "../components/ui/AppButton";
import { AppText } from "../components/ui/AppText";
import {
  getHospitalsLoadingState,
  getHospitalsErrorState,
  getHospitalsForSickListState,
} from "../store/selectors/hospitals";

const sickListTypes = [
  { label: "Больничный лист", value: "Больничный лист" },
  { label: "Форма 086/у", value: "Форма 086/у" },
  { label: "Форма 083/у", value: "Форма 083/у" },
];

export const DocumentScannedScreen = ({ navigation }) => {
  const [organization, setOrganization] = useState(null); // выбранная мед. организация
  const [listValue, setListValue] = useState("");
  const [typeSickList, setTypeSickList] = useState("");

  const isHospitalLoading = useSelector(getHospitalsLoadingState);
  const hospitals = useSelector(getHospitalsForSickListState);
  const hospitalsLoadError = useSelector(getHospitalsErrorState);

  const dispatch = useDispatch();

  const checkSickList = () => {
    Alert.alert("Пока не доступно", "Скоро заработает");
    console.log(organization.OrgId);
    console.log(listValue);
    console.log("Checking....");
  };

  useEffect(() => {
    dispatch(getAllHospitals());

    return () => {
      dispatch(clearHospitalsError());
    };
  }, []);

  if (isHospitalLoading) {
    return <Preloader />;
  }

  return (
    <ScrollView contentContainerStyle={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <AppBoldText style={styles.title}>
            Проверка мед. документа
          </AppBoldText>
          {/* Выводим ошибки */}
          {hospitalsLoadError ? (
            <AppBoldText style={styles.error}>{hospitalsLoadError}</AppBoldText>
          ) : hospitals?.ErrorDesc ? (
            <AppBoldText style={styles.error}>
              {hospitals.ErrorDesc}
            </AppBoldText>
          ) : null}
        </View>
        {hospitals && (
          <View style={styles.select}>
            <View style={styles.header}>
              <AppText style={styles.subtitle}>
                Выберите мед. учреждение
              </AppText>
            </View>
            <RNPickerSelect
              placeholder={{
                label: "Выбрать мед. учреждение",
                value: null,
                color: THEME.MAIN_COLOR,
              }}
              value={organization}
              onValueChange={setOrganization}
              items={hospitals.Orgs}
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
        <View style={styles.header}>
          <AppText style={styles.subtitle}>Выберите тип документа</AppText>
        </View>
        <View style={styles.select}>
          <RNPickerSelect
            placeholder={{
              label: "Выбрать тип документа",
              value: null,
              color: THEME.MAIN_COLOR,
            }}
            value={typeSickList}
            onValueChange={setTypeSickList}
            items={sickListTypes}
            useNativeAndroidPickerStyle={false}
            style={{
              ...pickerSelectStyles,
            }}
            Icon={() => (
              <AntDesign name="medicinebox" size={20} color="white" />
            )}
          />
        </View>
        <AppTextInput
          value={listValue}
          onChange={setListValue}
          placeholder="№ документа"
          type="numeric"
          style={{ marginBottom: 15 }}
        />
        <AppButton
          onPress={checkSickList}
          disabled={!listValue || !organization || !typeSickList}
        >
          Проверить документ
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
  error: {
    color: THEME.DANGER_COLOR,
    fontSize: 18,
    textAlign: "center",
  },
  header: {
    paddingVertical: 10,
  },
  subtitle: {
    textAlign: "center",
  },
  select: {
    marginBottom: 15,
  },
  item: {
    padding: 20,
    borderColor: THEME.MAIN_COLOR,
    borderWidth: 1,
    marginBottom: 5,
    borderRadius: 10,
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
