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
import { FontAwesome5 } from "@expo/vector-icons";

import {
  clearHospitalsError,
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
  getAllMoTypes,
  getAllMoErrorDesc,
  getAllMoLocals,
  getAllMOState,
} from "../store/selectors/hospitals";

export const HospitalDirectoryScreen = ({ navigation }) => {
  const [searchInput, setSearchInput] = useState("");
  const [localityValue, setLocalityValue] = useState(null);
  const [typeValue, setTypeValue] = useState(null);

  const allmo = useSelector(getAllMOState);
  const isHospitalLoading = useSelector(getHospitalsLoadingState);
  const ErrorDesc = useSelector(getAllMoErrorDesc);
  const locals = useSelector(getAllMoLocals());
  const types = useSelector(getAllMoTypes());
  const hospitalsLoadError = useSelector(getHospitalsErrorState);

  const dispatch = useDispatch();

  const searchOrganizations = () => {
    console.log("localityValue", localityValue);
    console.log("typeValue", typeValue);
    Alert.alert("Пока не доступно", "Скоро заработает");
  };

  useEffect(() => {
    dispatch(getAllMO());

    return () => {
      dispatch(clearHospitalsError());
      dispatch(clearAllMo());
    };
  }, []);

  useEffect(() => {
    if (locals) {
      setLocalityValue(locals[0].value);
    }
  }, [locals]);

  // useEffect(() => {
  //   if (types) {
  //     setTypeValue(types[0].value);
  //   }
  // }, [types]);

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
          ) : ErrorDesc ? (
            <AppBoldText style={styles.error}>{ErrorDesc}</AppBoldText>
          ) : null}
        </View>
        {locals && (
          <View style={styles.select}>
            <View style={styles.header}>
              <AppText style={styles.subtitle}>
                Выберите населенный пункт
              </AppText>
            </View>
            <RNPickerSelect
              value={localityValue}
              placeholder={{}}
              onValueChange={setLocalityValue}
              items={locals ? locals : []}
              useNativeAndroidPickerStyle={false}
              style={{
                ...pickerSelectStyles,
              }}
              Icon={() => <FontAwesome5 name="city" size={20} color="white" />}
            />
          </View>
        )}
        <View style={styles.header}>
          <AppText style={styles.subtitle}>
            Выберите тип мед. организации
          </AppText>
        </View>
        {types && (
          <View style={styles.select}>
            <RNPickerSelect
              value={typeValue}
              placeholder={{
                value: null,
                label: "Выберите тип организации",
                color: THEME.MAIN_COLOR,
              }}
              onValueChange={setTypeValue}
              items={types ? types : []}
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
