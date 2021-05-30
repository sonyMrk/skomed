import React, { useEffect, useState } from "react";
import { StyleSheet, ScrollView, View, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import RNPickerSelect from "react-native-picker-select";
import * as Linking from "expo-linking";

import {
  clearHospitalsError,
  getAllMO,
  clearAllMo,
} from "../store/actions/hospitals";
import { Preloader } from "../components/ui/Preloader";
import { AppBoldText } from "../components/ui/AppBoldText";
import { THEME } from "../theme";
import { AppTextInput } from "../components/ui/AppTextInput";
import { AppText } from "../components/ui/AppText";
import { InfoItem } from "../components/ui/InfoItem";
import {
  getHospitalsLoadingState,
  getHospitalsErrorState,
  getAllMoTypes,
  getAllMoErrorDesc,
  getAllMoLocals,
  getAllMoList,
} from "../store/selectors/hospitals";

export const MOItem = ({ mo }) => {
  const [visibleInfo, setVisibleInfo] = useState(false);

  const toggleVisibleInfo = () => {
    setVisibleInfo(!visibleInfo);
  };

  const handlePressEmail = () => {
    Linking.openURL(`mailto:${mo.Email}`);
  };

  const handlePressPhone = (tel) => {
    Linking.openURL(`tel:${tel}`);
  };

  const handlePressSite = () => {
    Linking.openURL(`https://${mo.Site}`);
  };

  return (
    <View>
      <TouchableOpacity onPress={toggleVisibleInfo}>
        <View style={styles.item}>
          <AppText>{mo.Name}</AppText>
        </View>
      </TouchableOpacity>
      {visibleInfo && (
        <View style={styles.moInfo}>
          <InfoItem title="Населенный пункт" value={mo.City} />
          <InfoItem title="Адрес" value={mo.Address} />
          <InfoItem title="Время работы" value={mo.WorkTime} />
          <InfoItem title="Эл. почта" value={mo.Email}>
            {mo.Email && (
              <TouchableOpacity onPress={handlePressEmail}>
                <AppBoldText style={{ color: "#005ce6" }}>
                  {mo.Email}
                </AppBoldText>
              </TouchableOpacity>
            )}
          </InfoItem>
          <InfoItem title="Сайт организации" value={mo.Site}>
            {mo.Site && (
              <TouchableOpacity onPress={handlePressSite}>
                <AppBoldText style={{ color: "#005ce6" }}>
                  {mo.Site}
                </AppBoldText>
              </TouchableOpacity>
            )}
          </InfoItem>
          <InfoItem title="Сайт организации" value={mo.Site}>
            {mo.Phones && (
              <View>
                {mo.Phones.split(";").map((phone) => (
                  <TouchableOpacity
                    onPress={() => {
                      handlePressPhone(phone);
                    }}
                    key={phone}
                  >
                    <AppBoldText style={{ color: "#005ce6", marginTop: 10 }}>
                      {phone}
                    </AppBoldText>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </InfoItem>
        </View>
      )}
    </View>
  );
};

export const HospitalDirectoryScreen = ({ navigation }) => {
  const [searchInput, setSearchInput] = useState("");
  const [localityValue, setLocalityValue] = useState(null);
  const [typeValue, setTypeValue] = useState(null);

  const isHospitalLoading = useSelector(getHospitalsLoadingState);
  const ErrorDesc = useSelector(getAllMoErrorDesc);
  const locals = useSelector(getAllMoLocals());
  const types = useSelector(getAllMoTypes(localityValue));
  const hospitalsLoadError = useSelector(getHospitalsErrorState);
  const MOList = useSelector(
    getAllMoList(localityValue, typeValue, searchInput)
  );

  const dispatch = useDispatch();

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

  useEffect(() => {
    if (types.length === 1) {
      setTypeValue(types[0].value);
    }
  }, [types]);

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
              fixAndroidTouchableBug={true}
              value={localityValue}
              placeholder={{}}
              onValueChange={setLocalityValue}
              items={locals ? locals : []}
              useNativeAndroidPickerStyle={false}
              style={{
                ...pickerSelectStyles,
              }}
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
              fixAndroidTouchableBug={true}
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
        <View style={styles.moList}>
          <View style={styles.header}>
            <AppBoldText style={styles.title}>Мед. организации:</AppBoldText>
          </View>
          {MOList && MOList.map((mo) => <MOItem key={mo.Name} mo={mo} />)}
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
    borderBottomColor: THEME.MAIN_COLOR,
    borderBottomWidth: 2,
    paddingBottom: 15,
    marginBottom: 10,
  },
  error: {
    color: THEME.DANGER_COLOR,
    fontSize: 18,
    textAlign: "center",
  },
  subtitle: {
    textAlign: "center",
    color: THEME.GRAY_COLOR,
  },
  select: {
    marginBottom: 5,
  },
  moList: {
    flex: 1,
    marginTop: 20,
  },
  moInfo: {
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  item: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: THEME.MAIN_COLOR,
    padding: 10,
    marginBottom: 5,
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
