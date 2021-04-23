import React from "react";
import { StyleSheet, View, ImageBackground } from "react-native";

import { MenuItem } from "../components/MenuItem";

const mainMenuItems = [
  {
    id: "1",
    title: "Запись на прием",
    icon: "ios-call-outline",
    navigateTo: "Appointment",
  },
  {
    id: "2",
    title: "Вызов врача на дом",
    icon: "business-outline",
    navigateTo: "HouseCallScreen",
  },
  {
    id: "3",
    title: "Поиск лекарств",
    icon: "search",
    navigateTo: "DrugSearchScreen",
  },
  {
    id: "4",
    title: "Справочник мед организаций",
    icon: "ios-book-outline",
    navigateTo: "HospitalDirectoryScreen",
  },
  {
    id: "5",
    title: "График работы врачей",
    icon: "calendar-outline",
    navigateTo: "ScheduleScreen",
  },
  {
    id: "6",
    title: "Проверка мед. документа",
    icon: "scan-circle-outline",
    navigateTo: "DocumentScannedScreen",
  },
];

export const MainScreen = ({ navigation }) => {
  const onMenuItemPress = (navigateTo) => {
    navigation.navigate(navigateTo);
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/images/main_bg.jpeg")}
        style={styles.image}
      >
        <View style={styles.menu}>
          {mainMenuItems.map((item) => (
            <MenuItem {...item} key={item.id} onPress={onMenuItemPress} />
          ))}
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  menu: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    flexWrap: "wrap",
    padding: 15,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
});
