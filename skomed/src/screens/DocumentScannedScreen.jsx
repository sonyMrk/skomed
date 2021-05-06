import React, { useEffect, useState } from "react";
import { StyleSheet, ScrollView, View, TouchableOpacity } from "react-native";
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
import { BarScanner } from "../components/BarScanner";
import {
  GetMedicalDocInfo,
  clearSickListInfo,
  clearUserError,
  getMedicalsDoctypes,
} from "../store/actions/user";
import { InfoItem } from "../components/ui/InfoItem";
import {
  getUserErrorMessageState,
  getUserLoadingState,
  getUserSickListState,
  getMedicalDoctypesState,
} from "../store/selectors/user";


const formatDate = (value) => {
  return `${value.substring(6, 8)}.${value.substring(4, 6)}.${value.substring(
    0,
    4
  )}`;
};

const SickListInfoBlock = ({ userSickListInfo }) => {
  return (
    <View>
      <AppBoldText style={styles.title}>Больничный лист</AppBoldText>
      <View style={styles.infoBlock}>
        <InfoItem title="Пациент" value={userSickListInfo.Patient} />
        <InfoItem title="Статус" value={userSickListInfo.Status} />
        <InfoItem
          title="Дата выдачи"
          value={formatDate(userSickListInfo.DateIssue)}
        />
        <InfoItem
          title="Дата продления"
          value={formatDate(userSickListInfo.DateRenewal)}
        />
        <InfoItem
          title="Дата закрытия"
          value={formatDate(userSickListInfo.DateClosing)}
        />
        <InfoItem
          title="Действителен"
          value={
            userSickListInfo.IsValid
              ? "Мед. документ действителен"
              : "Мед. документ не действителен"
          }
          color={userSickListInfo.IsValid ? "#1f7a1f" : THEME.DANGER_COLOR}
        />
      </View>
    </View>
  );
};

export const DocumentScannedScreen = ({ navigation }) => {
  const [isScanScreen, setIsScanScreen] = useState(false);

  const [organization, setOrganization] = useState(null); // выбранная мед. организация
  const [listValue, setListValue] = useState("");
  const [typeSickList, setTypeSickList] = useState("");

  const isHospitalLoading = useSelector(getHospitalsLoadingState);
  const hospitals = useSelector(getHospitalsForSickListState);
  const hospitalsLoadError = useSelector(getHospitalsErrorState);

  const userSickListError = useSelector(getUserErrorMessageState);
  const userSickListloading = useSelector(getUserLoadingState);
  const userSickListInfo = useSelector(getUserSickListState);

  const medicalDocTypes = useSelector(getMedicalDoctypesState)

  const dispatch = useDispatch();

  const checkSickList = () => {
    dispatch(clearSickListInfo());
    dispatch(GetMedicalDocInfo(organization.OrgID, listValue, typeSickList.ID));
  };

  const handleScannedQRCode = (data) => {
    const searchParams = data.split("?")[1];
    const query = {};
    const pairs = searchParams.split("&");

    for (let i = 0; i < pairs.length; i++) {
      let pair = pairs[i].split("=");
      query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || "");
    }

    // БАГ - ВЫЛЕТАЕТ ЕСЛИ СКАНИРОВАТЬ НЕ ПОДХОДЯЩИЙ QR

    const orgId = query.orgid ? query.orgid : organization.OrgID;
    const listNumber = query.number;
    const doctype = query.doctype ? query.doctype : typeSickList;

    dispatch(GetMedicalDocInfo(orgId, listNumber, doctype));
  };

  useEffect(() => {
    dispatch(getAllHospitals());
    dispatch(getMedicalsDoctypes())
    return () => {
      dispatch(clearHospitalsError());
      dispatch(clearSickListInfo());
      dispatch(clearUserError());
    };
  }, []);

  useEffect(() => {
    if (hospitals) {
      setOrganization(hospitals.Orgs[0].value);
    }
  }, [hospitals]);

  useEffect(() => {
    if(medicalDocTypes) {
      setTypeSickList(medicalDocTypes.Types[0].value);
    }
  }, [medicalDocTypes])

  if (isHospitalLoading) {
    return <Preloader />;
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <AppBoldText style={styles.title}>
            Проверка мед. документа
          </AppBoldText>
          {/* Выводим ошибки */}
          {hospitalsLoadError ? (
            <AppBoldText style={styles.error}>{hospitalsLoadError}</AppBoldText>
          ) : hospitals?.ErrorCode !== 0 ? (
            <AppBoldText style={styles.error}>
              {hospitals?.ErrorDesc}
            </AppBoldText>
          ) : userSickListError ? (
            <AppBoldText style={styles.error}>{userSickListError}</AppBoldText>
          ) : null}
        </View>
        <View style={styles.toggleProfile}>
          <View style={styles.checkboxWrapper}>
            <TouchableOpacity
              onPress={() => setIsScanScreen(false)}
              activeOpacity={0.5}
            >
              <View
                style={[
                  styles.checkbox,
                  !isScanScreen ? styles.activeCheckbox : {},
                ]}
              >
                <AppText
                  style={{
                    textAlign: "center",
                    color: !isScanScreen ? "#fff" : "#000",
                  }}
                >
                  Ввести вручную
                </AppText>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.checkboxWrapper}>
            <TouchableOpacity
              onPress={() => setIsScanScreen(true)}
              activeOpacity={0.5}
            >
              <View
                style={[
                  styles.checkbox,
                  isScanScreen ? styles.activeCheckbox : {},
                ]}
              >
                <AppText
                  style={{
                    textAlign: "center",
                    color: isScanScreen ? "#fff" : "#000",
                  }}
                >
                  Сканировать QR-code
                </AppText>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        {/* Если включен режим сканирования: */}
        {isScanScreen ? (
          <View style={styles.flex}>
            {/* Показывать сканер? */}

            {!userSickListInfo ? (
              // Если нет данных показываем сканнер
              <View style={styles.scannerWrapper}>
                <BarScanner onScanned={handleScannedQRCode} />
              </View>
            ) : // Если идет загрузка данных показываем прелоадером
            userSickListloading ? (
              <Preloader />
            ) : (
              <View style={styles.flex}>
                {/* Выводим данные */}
                <SickListInfoBlock userSickListInfo={userSickListInfo} />
                <AppButton
                  onPress={() => {
                    dispatch(clearSickListInfo());
                  }}
                >
                  Сканировать еще раз
                </AppButton>
              </View>
            )}
          </View>
        ) : // Если данные о листе не загружены:
        !userSickListInfo ? (
          <View style={styles.flex}>
            {/* Если идет загрузка */}
            {userSickListloading ? (
              <Preloader />
            ) : (
              <View>
                {/* Если список организаций загружен */}
                {hospitals && (
                  <View style={styles.select}>
                    <View style={styles.header}>
                      <AppText style={styles.subtitle}>
                        Выберите мед. учреждение
                      </AppText>
                    </View>
                    <RNPickerSelect
                      fixAndroidTouchableBug={true}
                      placeholder={{}}
                      value={organization}
                      onValueChange={setOrganization}
                      items={hospitals.Orgs}
                      useNativeAndroidPickerStyle={false}
                      style={{
                        ...pickerSelectStyles,
                      }}
                      // Icon={() => (
                      //   <AntDesign name="medicinebox" size={20} color="white" />
                      // )}
                    />
                  </View>
                )}
                <View style={styles.header}>
                  <AppText style={styles.subtitle}>
                    Выберите тип документа
                  </AppText>
                </View>
                {medicalDocTypes && <View style={styles.select}>
                  <RNPickerSelect
                    fixAndroidTouchableBug={true}
                    placeholder={{}}
                    value={typeSickList}
                    onValueChange={setTypeSickList}
                    items={medicalDocTypes.Types}
                    useNativeAndroidPickerStyle={false}
                    style={{
                      ...pickerSelectStyles,
                    }}
                    // Icon={() => (
                    //   <AntDesign name="medicinebox" size={20} color="white" />
                    // )}
                  />
                </View>}
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
            )}
          </View>
        ) : (
          // Иначе выводим данные
          <View style={styles.flex}>
            <SickListInfoBlock userSickListInfo={userSickListInfo} />
            <AppButton
              onPress={() => {
                dispatch(clearSickListInfo());
              }}
            >
              Вернуться назад
            </AppButton>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  flex: {
    flex: 1,
  },
  header: {
    paddingVertical: 10,
  },
  infoBlock: {
    padding: 10,
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
    color: THEME.GRAY_COLOR,
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
  toggleProfile: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  checkboxWrapper: {
    flexBasis: "48%",
  },
  checkbox: {
    marginBottom: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: THEME.MAIN_COLOR,
    borderRadius: 10,
    height: 50,
  },
  activeCheckbox: {
    backgroundColor: THEME.MAIN_COLOR,
  },
  activeText: {
    color: "#fff",
  },
  scannerWrapper: {
    minHeight: 300,
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
