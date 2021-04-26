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
import { createUserProfile, loadUserData, logout } from "../store/actions/user";

export const ProfileScreen = ({ navigation }) => {
  const [editMode, setEditMode] = useState(false); // в каком режиме открывается модальное окно
  const [iin, setIin] = useState("");
  const [phone, setPhone] = useState("");
  const [familyPersonData, setFamilyPersonData] = useState({
    iin: "",
    name: "",
  }); // если редактирование, то устанавливаем значение нужного члена семьи,
  // пустые значения при создании НОВОГО члена семьи
  // const [family, setFamily] = useState([]); // установка членов семьи
  // const [info, setInfo] = useState(null); // установка информации о текущем пользователе
  const [modalVisible, setModalVisible] = useState(false); // открыто ли модальное окно

  const userProfile = useSelector((state) => state.user.profile);
  const isLoading = useSelector((state) => state.user.isLoading);
  const info = useSelector((state) => state.user.userData);

  const dispatch = useDispatch();

  useEffect(() => {
    if (userProfile) {
      dispatch(loadUserData(userProfile.iin));
    }
  }, []);

  const createProfile = () => {
    if (iin.trim().length !== 12 || isNaN(iin)) {
      return Alert.alert(
        "Не корректный ИИН",
        "Значение ИИН должно быть 12 цифр"
      );
    }
    if (phone.length !== 10 || isNaN(phone)) {
      return Alert.alert(
        "Не корректный номер телефона",
        "Значение телефона должно быть 10 цифр"
      );
    }
    dispatch(createUserProfile({ iin, phone }));
    setIin("");
    setPhone("");
  };

  // добавляем нового члена семьи
  const addFamilyPerson = (newMan) => {
    setFamily((prev) => [...prev, newMan]);
  };

  const goToAppointment = (iin, name) => {
    // записать члена семьи на прием
  };

  const goToHouseCall = (iin, name) => {
    // вызвать врача для члена семьи
  };

  // редактирование члена семьи
  const editFamilyPerson = (newMan) => {
    setFamily((prev) =>
      prev.map((item) => {
        if (item.iin === newMan.iin) {
          return newMan;
        }
        return item;
      })
    );
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
  const openModalForEdit = (iin) => {
    const person = family.find((item) => item.iin === iin);
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
  const deleteFamilyPerson = (iin) => {
    setFamily((prev) => prev.filter((item) => item.iin !== iin));
  };

  //
  const handlePressDelete = (iin) => {
    Alert.alert("Удаление члена семьи", "Вы уверены?", [
      {
        text: "Отмена",
        style: "cancel",
      },
      { text: "OK", onPress: () => deleteFamilyPerson(iin) },
    ]);
  };

  // вернуться назад
  const goToMain = () => {
    navigation.navigate("Main");
  };

  // выйти из учетной записи
  const handleLogout = () => {
    Alert.alert("Выйти из учетной записи", "Вы уверены?", [
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
    ]);
  };

  console.log("isLoading====", isLoading);

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <SafeAreaView style={styles.wrapper}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {userProfile ? (
          <View style={styles.container}>
            <AppBoldText style={styles.title}>Данные пользователя</AppBoldText>
            {info && (
              <InfoBlock infoData={info}>
                <EditModal
                  visible={modalVisible}
                  onClose={closeModal}
                  addPerson={addFamilyPerson}
                  editPerson={editFamilyPerson}
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

              {/* {userProfile &&
                userProfile.family.map((item) => (
                  <FamilyItem
                    {...item}
                    key={item.iin}
                    onEdit={openModalForEdit}
                    onDelete={handlePressDelete}
                  />
                ))} */}
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
            <AppTextInput
              placeholder="ИИН"
              value={iin}
              onChange={setIin}
              type="numeric"
              style={{ marginBottom: 20 }}
            />
            <AppTextInput
              placeholder="Номер телефона без первой цифры"
              value={phone}
              onChange={setPhone}
              type="numeric"
              style={{ marginBottom: 20 }}
            />
            <AppButton
              style={{ width: "100%" }}
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
