import React from "react";
import { StyleSheet, View, Dimensions, Image } from "react-native";

const { MenuItem } = require("./MenuItem");

const { width: viewportWidth, height: viewportHeight } =
  Dimensions.get("window");

export const Menu = ({ onMenuItemPress, setModalVisible }) => {
  const handleOpenModal = () => {
    setModalVisible(true);
  };

  return (
    <View style={styles.menu}>
      <MenuItem title="Запись на прием" key="1" onPress={handleOpenModal}>
        <Image
          source={require("../../../../assets/icons/appointment.png")}
          style={styles.icon}
        />
      </MenuItem>

      <MenuItem
        title="Вызов врача на дом"
        key="2"
        onPress={onMenuItemPress}
        navigateTo="HouseCallScreen"
      >
        <Image
          source={require("../../../../assets/icons/house_call.png")}
          style={styles.icon}
        />
      </MenuItem>

      <MenuItem
        title="График работы врачей"
        key="3"
        onPress={onMenuItemPress}
        navigateTo="ScheduleScreen"
      >
        <Image
          source={require("../../../../assets/icons/shedule.png")}
          style={styles.icon}
        />
      </MenuItem>

      <MenuItem
        title="Оценка работы врача"
        key="4"
        onPress={onMenuItemPress}
        navigateTo="WorkEvaluation"
      >
        <Image
          source={require("../../../../assets/icons/work_ev.png")}
          style={styles.icon}
        />
      </MenuItem>

      <MenuItem
        title="Проверка документа"
        key="5"
        onPress={onMenuItemPress}
        navigateTo="DocumentScannedScreen"
      >
        <Image
          source={require("../../../../assets/icons/doc_scan.png")}
          style={styles.icon}
        />
      </MenuItem>
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: Dimensions.get("screen").width / 15,
    height: Dimensions.get("screen").width / 15,
    resizeMode: "contain",
  },

  menu: {
    flex: 2.2,
    width: viewportWidth,
    marginTop: viewportHeight / 40,
  },
});
