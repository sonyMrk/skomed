import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  SafeAreaView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";

import { AppButton } from "../components/ui/AppButton";
import { THEME } from "../theme";
import { AppBoldText } from "./../components/ui/AppBoldText";
import { Preloader } from "../components/ui/Preloader";
import { FamilyItem } from "../components/FamilyItem";
import { EditModal } from "../components/EditModal";
import { InfoBlock } from "../components/InfoBlock";
import { AppTextInput } from "../components/ui/AppTextInput";
import {
  createUserProfile,
  logout,
  editFamilyPerson,
  removeFamilyPerson,
} from "../store/actions/user";
import { createFamilyPerson } from "./../store/actions/user";
import {
  getUserProfileState,
  getUserDataState,
  getUserLoadingState,
  getUserErrorMessageState,
} from "../store/selectors/user";

export const ProfileScreen = ({ navigation }) => {
  const [editMode, setEditMode] = useState(false); // в каком режиме открывается модальное окно
  const [iin, setIin] = useState("");
  const [phoneValue, setPhoneValue] = useState("");
  const [familyPersonData, setFamilyPersonData] = useState({
    value: "",
    label: "",
  }); // если редактирование, то устанавливаем значение нужного члена семьи,
  // пустые значения при создании НОВОГО члена семьи
  const [modalVisible, setModalVisible] = useState(false); // открыто ли модальное окно

  const userProfile = useSelector(getUserProfileState);
  const isLoading = useSelector(getUserLoadingState);
  const info = useSelector(getUserDataState);
  const profileLoadError = useSelector(getUserErrorMessageState);

  const dispatch = useDispatch();

  const createProfile = () => {
    if (iin.trim().length !== 12 || isNaN(iin)) {
      Alert.alert("Не корректный ИИН", "Значение ИИН должно быть 12 цифр");
    } else if (phoneValue.length < 11 || isNaN(phoneValue)) {
      Alert.alert(
        "Не корректный номер телефона",
        "Введите корректный номер телефона"
      );
    } else {
      dispatch(createUserProfile({ iin, phone: `+7${phoneValue.slice(-10)}` }));
      setIin("");
      setPhoneValue("");
    }
  };
  // добавляем нового члена семьи
  const addFamilyPerson = (newMan) => {
    dispatch(createFamilyPerson(newMan));
  };

  // редактирование члена семьи
  const handleEditFamilyPerson = (newMan) => {
    dispatch(editFamilyPerson(newMan));
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  // открыть модальное окно в режиме добавления
  const openModalForAdd = () => {
    setFamilyPersonData({
      iin: "",
      name: "",
    });
    setModalVisible(true);
  };

  // открыть модальное окно в режиме редактирования
  const openModalForEdit = (id) => {
    const person = userProfile.family.find((item) => item.id === id);
    if (person) {
      setEditMode(true);
      setFamilyPersonData(person);
      setModalVisible(true);
    }
  };

  // отключаем режим редактирования члена семьи, чтобы в модальном окне
  // настройки стали обычными
  const turnOffEditMode = () => {
    setEditMode(false);
  };

  // удаление члена семьи
  const handleRemoveFamilyPerson = (id) => {
    dispatch(removeFamilyPerson(id));
  };

  //
  const handlePressDelete = (iin) => {
    Alert.alert("Удаление члена семьи", "Вы уверены?", [
      {
        text: "Отмена",
        style: "cancel",
      },
      { text: "OK", onPress: () => handleRemoveFamilyPerson(iin) },
    ]);
  };

  // вернуться назад
  const goToMain = () => {
    navigation.navigate("Main");
  };

  // выйти из учетной записи
  const handleLogout = () => {
    Alert.alert(
      "Выйти из учетной записи",
      "Вы уверены? Все данные будут удалены",
      [
        {
          text: "Отмена",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            dispatch(logout());
          },
        },
      ]
    );
  };

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <SafeAreaView style={styles.wrapper}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {userProfile ? (
          <View style={styles.container}>
            <AppBoldText style={styles.title}>Данные пользователя</AppBoldText>
            {profileLoadError && (
              <AppBoldText style={{ color: THEME.DANGER_COLOR, fontSize: 18 }}>
                {profileLoadError}
              </AppBoldText>
            )}
            {info && (
              <InfoBlock infoData={info}>
                <EditModal
                  visible={modalVisible}
                  onClose={closeModal}
                  addPerson={addFamilyPerson}
                  editPerson={handleEditFamilyPerson}
                  editMode={editMode}
                  personData={familyPersonData}
                  offEditMode={turnOffEditMode}
                />
              </InfoBlock>
            )}
            <View style={styles.family}>
              <View style={styles.addPerson}>
                <AppBoldText style={styles.title}>Семья</AppBoldText>
                <View>
                  <AppButton
                    color="#0066ff"
                    style={styles.btn}
                    onPress={openModalForAdd}
                  >
                    <Ionicons name="add" size={24} color="white" />
                  </AppButton>
                </View>
              </View>

              {userProfile &&
                userProfile.family.map((item) => (
                  <FamilyItem
                    {...item}
                    key={item.id}
                    onEdit={openModalForEdit}
                    onDelete={handlePressDelete}
                  />
                ))}
            </View>
            <View style={styles.footer}>
              <View style={styles.actions}>
                <View>
                  <AppButton color="#ff4d4d" onPress={handleLogout}>
                    Выйти из учетной записи
                  </AppButton>
                </View>
                <View>
                  <AppButton onPress={goToMain}>На главную</AppButton>
                </View>
              </View>
            </View>
          </View>
        ) : (
          <View style={styles.loginContainer}>
            {profileLoadError && (
              <AppBoldText
                style={{ color: THEME.DANGER_COLOR, marginBottom: 15 }}
              >
                {profileLoadError}
              </AppBoldText>
            )}
            <AppTextInput
              placeholder="ИИН"
              value={iin}
              onChange={setIin}
              type="numeric"
              style={{ marginBottom: 20 }}
              maxLength={12}
            />
            <AppTextInput
              placeholder="Номер телефона"
              value={phoneValue}
              onChange={setPhoneValue}
              type="phone-pad"
              style={{ marginBottom: 20 }}
              maxLength={12}
            />
            <AppButton
              style={{ paddingHorizontal: 55 }}
              onPress={() => createProfile()}
            >
              Далее
            </AppButton>
          </View>
        )}
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
  loginContainer: {
    backgroundColor: "white",
    padding: 30,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    textAlign: "center",
    textTransform: "uppercase",
    paddingVertical: 20,
    backgroundColor: "#fff",
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
