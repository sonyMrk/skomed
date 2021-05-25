import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView, Dimensions } from "react-native";
import { AppText } from "../components/ui/AppText";
import { AppButton } from "../components/ui/AppButton";
import { useDispatch, useSelector } from "react-redux";
import RNPickerSelect from "react-native-picker-select";

import newId from "../utils/newId";
import {
  getMedicationsLoadingState,
  getMedicationsErrorState,
  getMedicationsListState,
} from "../store/selectors/medications";
import {
  getMedicationsList,
  clearMedicationsError,
  clearMedicationsList,
} from "../store/actions/medications";
import { Preloader } from "../components/ui/Preloader";
import { THEME } from "../theme";
import { AppBoldText } from "../components/ui/AppBoldText";
import { AppTextInput } from "../components/ui/AppTextInput";
import { InfoItem } from "../components/ui/InfoItem";
import { MedicationsMap } from "../components/MedicationsMap";

const pharmacysList = [
  { value: "all", label: "Все аптеки" },
  { value: " Семейный", label: "Семейный" },
  { value: " Семейный Муканова ", label: "Семейный Муканова" },
  { value: " Цветная ", label: "Цветная" },
  { value: `"9 Месяцев"`, label: `"9 Месяцев"` },
  { value: "Аптека Форте", label: "Аптека Форте" },
  { value: "Аптека №87", label: "Аптека №87" },
  { value: "Аптекарь", label: "Аптекарь" },
  { value: "Ваша аптека", label: "Ваша аптека" },
  { value: "Визит", label: "Визит" },
  { value: "Здрава", label: "Здрава" },
  { value: "Здраво", label: "Здраво" },
  { value: "Зенит", label: "Зенит" },
  { value: "Импульс", label: "Импульс" },
  {
    value: `Интернет-магазин "shop.diaper.kz"`,
    label: `Интернет-магазин "shop.diaper.kz"`,
  },
  { value: "Ишимская", label: "Ишимская" },
  { value: "Магазин Гамма", label: "Магазин Гамма" },
  { value: "Мелодия здоровья", label: "Мелодия здоровья" },
  { value: "Мелодия здоровья Букетова", label: "Мелодия здоровья Букетова" },
  {
    value: "Мелодия здоровья Назарбаева,177",
    label: "Мелодия здоровья Назарбаева,177",
  },
  {
    value: "Мелодия здоровья Назарбаева,211",
    label: "Мелодия здоровья Назарбаева,211",
  },
  { value: "Мое здоровье", label: "Мое здоровье" },
  { value: "Орда", label: "Орда" },
  { value: "Радуга звуков", label: "Радуга звуков" },
  { value: "Радуга звуков", label: "Радуга звуков" },
  { value: "Рецепт здоровья", label: "Рецепт здоровья" },
  {
    value: "Рецепт здоровья на Володарского",
    label: "Рецепт здоровья на Володарского",
  },
  { value: "Семейный Бишкуль", label: "Семейный Бишкуль" },
  { value: "Семейный Жабаева", label: "Семейный Жабаева" },
  { value: "Теникс-СК", label: "Теникс-СК" },
  { value: "Точка опоры", label: "Точка опоры" },
  { value: "№112 Цветная", label: "№112 Цветная" },
  { value: "№20 Цветная ", label: "№20 Цветная" },
  { value: "№34 Цветная ", label: "№34 Цветная" },
  { value: "№40 Цветная", label: "№40 Цветная" },
  { value: "№7", label: "№7" },
  { value: "№7 Абая", label: "№7 Абая" },
  { value: "№7 Астана", label: "№7 Астана" },
  { value: "№7 Гагарина", label: "№7 Гагарина" },
  { value: "№7 Назарбаева,110", label: "№7 Назарбаева,110" },
  { value: "№7 Назарбаева,284", label: "№7 Назарбаева,284" },
  { value: "№7 Пушкина", label: "№7 Пушкина" },
  { value: "№7 Рахимова", label: "№7 Рахимова" },
  { value: "№7 Сатпаева", label: "№7 Сатпаева" },
];

const disctrictList = [
  { value: "all", label: "Все районы" },
  { value: `Ажар"`, label: `"Ажар"` },
  { value: `Достык"`, label: `Достык"` },
  { value: `Дошкольник" `, label: `Дошкольник"` },
  { value: `Карандаш" `, label: `Карандаш"` },
  { value: `Карасай" `, label: `"Карасай"` },
  { value: `Рахмет"`, label: `"Рахмет"` },
  { value: `"Тайга"`, label: `"Тайга"` },
  { value: "19 мкр", label: "19 мкр" },
  { value: "2-я гор.полик-ка", label: "2-я гор.полик-ка" },
  { value: "3-я гор.больница", label: "3-я гор.больница" },
  { value: "аул Бишкуль", label: "аул Бишкуль" },
  { value: "байтерек", label: "байтерек" },
  { value: "береке", label: "береке" },
  { value: "БЭСТ ", label: "БЭСТ" },
  { value: "взр.обл.б-ца", label: "взр.обл.б-ца" },
  { value: "взр.обл.больница", label: "взр.обл.больница" },
  { value: "вокзал", label: "вокзал" },
  { value: "ГОВД", label: "ГОВД" },
  { value: "департамент юстиции", label: "департамент юстиции" },
  { value: "жас оркен", label: "жас оркен" },
  { value: "з-д Кирова", label: "з-д Кирова" },
  { value: "з-д Ленина, ПЗТМ", label: "з-д Ленина, ПЗТМ" },
  { value: "зайсан", label: "зайсан" },
  {
    value: "зайсан (заправочная станция)",
    label: "зайсан (заправочная станция)",
  },
  { value: "казахский театр", label: "казахский театр" },
  { value: "казахтелеком", label: "казахтелеком" },
  { value: "колхозный рынок", label: "колхозный рынок" },
  { value: "молодёжный посёлок ", label: "молодёжный посёлок" },
  { value: "океан", label: "океан" },
  { value: "ост.Чкалова", label: "ост.Чкалова" },
  { value: "р-н Айсберга", label: "р-н Айсберга" },
  { value: "северный", label: "северный" },
  { value: "сокол", label: "сокол" },
  { value: "таможенное управление", label: "таможенное управление" },
  { value: "туркестан", label: "туркестан" },
  { value: "центр", label: "центр" },
  { value: "центральная мечеть", label: "центральная мечеть" },
  { value: "ЦОТ", label: "ЦОТ" },
];

const testData = [
  {
    address: "северный, Назарбаева, 252",
    apteka: " Семейный",
    name: "Нафазолин 0,1% 10мл флакон-капельница",
    phone: "39-85-98",
    price: "90",
    updateTime: "(25-05-2021)",
    workTime: "9-23ч.",
    coordinate: {
      latitude: 54.88524449368686,
      longitude: 69.14550787965527,
    },
  },
  // {
  //   address: "северный, Назарбаева, 252",
  //   apteka: " Семейный",
  //   name: "Нафазолин 0,1% 10мл спрей",
  //   phone: "39-85-98",
  //   price: "280",
  //   updateTime: "(25-05-2021)",
  //   workTime: "9-23ч.",
  // },
  // {
  //   address: "северный, Назарбаева, 252",
  //   apteka: " Семейный",
  //   name: "Нафазолин 0,05% 10мл флакон-капельница",
  //   phone: "39-85-98",
  //   price: "85",
  //   updateTime: "(25-05-2021)",
  //   workTime: "9-23ч.",
  // },
  // {
  //   address: "северный, Назарбаева, 252",
  //   apteka: " Семейный",
  //   name: "Нафазолин 0,05% 10мл детский спрей",
  //   phone: "39-85-98",
  //   price: "265",
  //   updateTime: "(25-05-2021)",
  //   workTime: "9-23ч.",
  // },
  // {
  //   address: "з-д Кирова, Муканова, 53",
  //   apteka: " Семейный Муканова ",
  //   name: "Нафазолин 0,1% 10мл флакон-капельница",
  //   phone: "53-16-27",
  //   price: "90",
  //   updateTime: "(25-05-2021)",
  //   workTime: "9-23ч.ДОСТАВКА",
  // },
  // {
  //   address: "з-д Кирова, Муканова, 53",
  //   apteka: " Семейный Муканова ",
  //   name: "Нафазолин 0,1% 10мл спрей",
  //   phone: "53-16-27",
  //   price: "280",
  //   updateTime: "(25-05-2021)",
  //   workTime: "9-23ч.ДОСТАВКА",
  // },
  // {
  //   address: "з-д Кирова, Муканова, 53",
  //   apteka: " Семейный Муканова ",
  //   name: "Нафазолин 0,05% 10мл детский спрей",
  //   phone: "53-16-27",
  //   price: "265",
  //   updateTime: "(25-05-2021)",
  //   workTime: "9-23ч.ДОСТАВКА",
  // },
];

export const DrugSearchScreen = ({ navigation }) => {
  const [medicationName, setMedicationName] = useState("");
  const [mapScreen, setMapScreen] = useState(false);
  const [pharmacy, setPharmacy] = useState(null);
  const [district, setDistrict] = useState(null);

  const medicationsList = useSelector(getMedicationsListState);
  const medicationsLoading = useSelector(getMedicationsLoadingState);
  const medicationsError = useSelector(getMedicationsErrorState);

  const dispatch = useDispatch();

  const handleSearch = () => {
    // dispatch(clearMedicationsList());
    dispatch(getMedicationsList(medicationName, pharmacy, district));
  };

  const handleGoBack = () => {
    dispatch(clearMedicationsError());
    dispatch(clearMedicationsList());
  };

  const handleWatchOnMap = (value) => {
    setMapScreen(value);
  };

  useEffect(() => {
    return () => {
      dispatch(clearMedicationsError());
      dispatch(clearMedicationsList());
      setMedicationName("");
      setPharmacy(null);
      setDistrict(null);
    };
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        {medicationsList ? (
          <View>
            <View style={styles.result}>
              {mapScreen ? (
                <View>
                  <AppButton
                    onPress={() => {
                      handleWatchOnMap(false);
                    }}
                  >
                    Посмотреть список
                  </AppButton>
                  {medicationsList && (
                    <MedicationsMap medicationsList={medicationsList} />
                  )}
                </View>
              ) : (
                <View style={styles.result__list}>
                  <AppButton onPress={handleGoBack}>Вернутся назад</AppButton>
                  {medicationsList.length == 0 ? (
                    <AppText style={styles.result__text}>
                      ИЗВИНИТЕ, на данный момент в базе данных Справочной службы
                      138 этого препарата (изделия) нет. Не забудьте уточнить
                      название препарата
                    </AppText>
                  ) : (
                    <AppText
                      style={{
                        ...styles.result__text,
                        color: THEME.DANGER_COLOR,
                      }}
                    >
                      Пожалуйста, для уточнения цены и фактического наличия
                      лекарства перезвоните в аптеку!
                    </AppText>
                  )}
                  <AppButton
                    onPress={() => {
                      handleWatchOnMap(true);
                    }}
                  >
                    Посмотреть на карте
                  </AppButton>
                  {medicationsList &&
                    medicationsList.map((item) => {
                      return (
                        <View style={styles.result__item} key={newId()}>
                          <InfoItem title="Адрес" value={item.address} />
                          <InfoItem title="Аптека" value={item.apteka} />
                          <InfoItem title="Телефон" value={item.phone} />
                          <InfoItem
                            title="График работы"
                            value={item.workTime}
                          />
                          <InfoItem
                            title="Название лекарства"
                            value={item.name}
                          />
                          <InfoItem title="Цена" value={`${item.price} тг`} />
                          <InfoItem
                            title="Последнее обновление данных"
                            value={item.updateTime}
                          />
                        </View>
                      );
                    })}
                </View>
              )}
            </View>
          </View>
        ) : (
          <View>
            {medicationsError ? (
              <View style={styles.errorWrapper}>
                <AppBoldText style={styles.error}>
                  {medicationsError}
                </AppBoldText>
              </View>
            ) : null}
            {medicationsLoading ? (
              <Preloader />
            ) : (
              <View style={styles.filters}>
                <View style={styles.select}>
                  <View style={styles.header}>
                    <AppText style={styles.subtitle}>Введите название</AppText>
                  </View>
                  <AppTextInput
                    placeholder="Название лекарства"
                    onChange={setMedicationName}
                    value={medicationName}
                  />
                </View>

                <View style={styles.select}>
                  <View style={styles.header}>
                    <AppText style={styles.subtitle}>Выберите аптеку</AppText>
                  </View>
                  <RNPickerSelect
                    fixAndroidTouchableBug={true}
                    placeholder={{
                      value: null,
                      label: "Выберите аптеку",
                      color: THEME.MAIN_COLOR,
                    }}
                    onValueChange={setPharmacy}
                    items={pharmacysList}
                    useNativeAndroidPickerStyle={false}
                    style={{
                      ...pickerSelectStyles,
                    }}
                    // Icon={() => (
                    //   <AntDesign name="medicinebox" size={20} color="white" />
                    // )}
                  />
                </View>
                <View style={styles.select}>
                  <View style={styles.header}>
                    <AppText style={styles.subtitle}>Выберите район</AppText>
                  </View>
                  <RNPickerSelect
                    fixAndroidTouchableBug={true}
                    placeholder={{
                      value: null,
                      label: "Выберите район",
                      color: THEME.MAIN_COLOR,
                    }}
                    onValueChange={setDistrict}
                    items={disctrictList}
                    useNativeAndroidPickerStyle={false}
                    style={{
                      ...pickerSelectStyles,
                    }}
                    // Icon={() => (
                    //   <AntDesign name="medicinebox" size={20} color="white" />
                    // )}
                  />
                </View>
                <AppButton
                  onPress={handleSearch}
                  disabled={medicationName.length < 2}
                >
                  Поиск
                </AppButton>
              </View>
            )}
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
  header: {
    paddingVertical: 5,
  },
  title: {
    textAlign: "center",
    fontSize: 18,
    paddingBottom: 15,
    marginBottom: 10,
    marginTop: 15,
  },
  errorWrapper: {
    marginBottom: 15,
  },
  error: {
    color: THEME.DANGER_COLOR,
    fontSize: 18,
    textAlign: "center",
  },
  filters: {},
  subtitle: {
    textAlign: "center",
    color: THEME.GRAY_COLOR,
  },
  select: {
    marginVertical: 10,
  },
  result: {
    marginTop: 20,
  },
  map__tooltip: {
    borderRadius: 10,
    backgroundColor: "#fff",
    padding: 10,
  },
  tooltip__row: {},
  result__item: {
    marginTop: 20,
    borderColor: THEME.MAIN_COLOR,
    borderWidth: 2,
    borderRadius: 10,
    padding: 15,
    backgroundColor: "#fff",
  },
  result__text: {
    textAlign: "center",
    marginVertical: 20,
  },
  result__list: {},
  map: {
    width: "100%",
    height: "100%",
  },
  map__wrapper: {
    padding: 10,
    height: Dimensions.get("window").height * 0.7,
    width: "100%",
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
