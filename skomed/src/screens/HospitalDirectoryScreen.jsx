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
import { FontAwesome5 } from '@expo/vector-icons';

import {
  getAllHospitals,
  clearHospitalsError,
  clearAllHospitals,
  getAllMO,
  clearAllMo,
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
  getAllMOState,
} from "../store/selectors/hospitals";

const sickListTypes = [
  { label: "Больничный лист", value: "Больничный лист" },
  { label: "Форма 086/у", value: "Форма 086/у" },
  { label: "Форма 083/у", value: "Форма 083/у" },
];

export const HospitalDirectoryScreen = ({ navigation }) => {
  const [searchInput, setSearchInput] = useState("");

  const isHospitalLoading = useSelector(getHospitalsLoadingState);
  const allMo = useSelector(getAllMOState);
  const hospitalsLoadError = useSelector(getHospitalsErrorState);

  const dispatch = useDispatch();

  const searchOrganizations = () => {
    Alert.alert("Пока не доступно", "Скоро заработает");
  };

  useEffect(() => {
    dispatch(getAllMO());

    return () => {
      dispatch(clearHospitalsError());
      dispatch(clearAllMo());
    };
  }, []);

  if (isHospitalLoading) {
    return <Preloader />;
  }

  return (
    <ScrollView contentContainerStyle={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.header}>
          {/* Выводим ошибки */}
          {hospitalsLoadError ? (
            <AppBoldText style={styles.error}>{hospitalsLoadError}</AppBoldText>
          ) : allMo?.ErrorDesc ? (
            <AppBoldText style={styles.error}>
              {allMo.ErrorDesc}
            </AppBoldText>
          ) : null}
        </View>
          {allMo && <View style={styles.select}>
            <View style={styles.header}>
              <AppText style={styles.subtitle}>
                Выберите населенный пункт
              </AppText>
            </View>
            <RNPickerSelect
              placeholder={{
                label: "Выбрать нас. пункт",
                value: null,
                color: THEME.MAIN_COLOR,
              }}
              // value={typeOrg}
              onValueChange={() => {}}
              items={allMo?.locals? allMo?.locals : []}
              useNativeAndroidPickerStyle={false}
              style={{
                ...pickerSelectStyles,
              }}
              Icon={() => (
                <FontAwesome5 name="city" size={20} color="white" />
              )}
            />
          </View>}
        <View style={styles.header}>
          <AppText style={styles.subtitle}>
            Выберите тип мед. организации
          </AppText>
        </View>
        {allMo && <View style={styles.select}>
          <RNPickerSelect
            placeholder={{
              label: "Выбрать тип организации",
              value: null,
              color: THEME.MAIN_COLOR,
            }}
            // value={typeOrg}
            onValueChange={() => {}}
            items={allMo?.types? allMo?.types : []}
            useNativeAndroidPickerStyle={false}
            style={{
              ...pickerSelectStyles,
            }}
            Icon={() => (
              <AntDesign name="medicinebox" size={20} color="white" />
            )}
          />
        </View>}
        <View style={styles.header}>
          <AppText style={styles.subtitle}>Найти по названию</AppText>
        </View>
        <AppTextInput
          value={searchInput}
          onChange={setSearchInput}
          placeholder="Поиск по строке"
          style={{ marginBottom: 15 }}
        />
        <AppButton onPress={searchOrganizations}>Поиск</AppButton>
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
