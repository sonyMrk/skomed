import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  SafeAreaView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { AppButton } from "../components/ui/AppButton";
import { AppText } from "../components/ui/AppText";
import { THEME } from "../theme";
import { AppBoldText } from "./../components/ui/AppBoldText";
import { ProfileInfoItem } from "../components/ProfileInfoItem";
import { Preloader } from "../components/ui/Preloader";
import { FamilyItem } from "../components/FamilyItem";
import { EditModal } from "../components/EditModal";

const infoData = [
  {
    id: "1",
    title: "Ф.И.О",
    value: "Пупкин Иван Вячеславович",
  },
  {
    id: "2",
    title: "Мед организация прикрепления",
    value: `КГП на ПХВ "Городская поликлиника №3 КГУ "УЗ акимата СКО"`,
  },
  {
    id: "3",
    title: "Адрес",
    value: `Казахстан, Обл.СЕВЕРО-КАЗАХСТАНСКАЯ, г.ПЕТРОПАВЛОВСК, ул.РИЖСКАЯ,
    д. 108, кв 40`,
  },
  {
    id: "4",
    title: "Участок",
    value: "Общей практики участок 2",
  },
];

const familyData = [
  {
    name: "Иванов Олег Васильевич",
    iin: "910414360902",
  },
  {
    name: "Иванов Олег Васильевич",
    iin: "9104143609123",
  },
  {
    name: "Иванов Олег Васильевич",
    iin: "910414360902asd",
  },
  {
    name: "Иванов Олег Васильевич",
    iin: "adsgasdf",
  },
];

export const ProfileScreen = ({ navigation }) => {
  const [isReady, setIsReady] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [familyPersonData, setFamilyPersonData] = useState({
    iin: "",
    name: "",
  });
  const [family, setFamily] = useState([]);
  const [info, setInfo] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    setInfo(infoData);
    setFamily(familyData);
    setIsReady(true);
  }, []);

  const addFamilyPerson = (newMan) => {
    setFamily((prev) => [...prev, newMan]);
  };

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const turnOffEditMode = () => {
    setEditMode(false);
  };

  const handlePressEdit = (iin) => {
    const person = family.find((item) => item.iin === iin);
    if (person) {
      setEditMode(true);
      setFamilyPersonData(person);
      toggleModal();
    }
  };

  const deleteFamilyPerson = (iin) => {
    setFamily((prev) => prev.filter((item) => item.iin !== iin));
  };

  const handlePressDelete = (iin) => {
    Alert.alert("Удаление члена семьи", "Вы уверены?", [
      {
        text: "Отмена",
        style: "cancel",
      },
      { text: "OK", onPress: () => deleteFamilyPerson(iin) },
    ]);
  };

  const goToMain = () => {
    navigation.navigate("Main");
  };

  const logout = () => {
    Alert.alert("Выйти из учетной записи", "Вы уверены?", [
      {
        text: "Отмена",
        style: "cancel",
      },
      { text: "OK", onPress: () => goToMain() },
    ]);
  };

  if (!isReady) {
    return <Preloader />;
  }

  return (
    <SafeAreaView style={styles.wrapper}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          <AppBoldText style={styles.title}>Данные пользователя</AppBoldText>
          <View style={styles.info}>
            {info.map((item) => (
              <ProfileInfoItem {...item} key={item.id} />
            ))}
            <EditModal
              visible={modalVisible}
              toggleModal={toggleModal}
              onSave={addFamilyPerson}
              editMode={editMode}
              personData={familyPersonData}
              offEditMode={turnOffEditMode}
            />
          </View>

          <View style={styles.family}>
            <View style={styles.addPerson}>
              <AppBoldText style={styles.title}>Семья</AppBoldText>
              <View>
                <AppButton
                  color="#0066ff"
                  style={styles.btn}
                  onPress={toggleModal}
                >
                  <Ionicons name="add" size={24} color="white" />
                </AppButton>
              </View>
            </View>

            {family.map((item) => (
              <FamilyItem
                {...item}
                key={item.iin}
                onEdit={handlePressEdit}
                onDelete={handlePressDelete}
              />
            ))}
          </View>
          <View style={styles.footer}>
            <View style={styles.actions}>
              <View>
                <AppButton color="#ff4d4d" onPress={logout}>
                  Выйти из учетной записи
                </AppButton>
              </View>
              <View>
                <AppButton onPress={goToMain}>На главную</AppButton>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: THEME.MAIN_COLOR,
  },
  title: {
    textAlign: "center",
    textTransform: "uppercase",
    paddingVertical: 20,
    backgroundColor: "#fff",
  },
  info: {
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  footer: {
    flexGrow: 1,
    justifyContent: "flex-end",
    backgroundColor: "#fff",
    padding: 10,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  family: {
    justifyContent: "center",
    marginVertical: 3,
    backgroundColor: "#fff",
    padding: 10,
  },
  addPerson: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  btn: {
    borderRadius: 50,
    paddingHorizontal: 10,
  },
});
