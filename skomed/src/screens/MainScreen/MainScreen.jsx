import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

import { ModalRecordsType } from "./components/ModalRecordTypes";
import { Menu } from "./components/Menu";
import { MainCarousel } from "./components/MainCarousel";
import { MainBanner } from "./components/MainBanner";

export const MainScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const onMenuItemPress = (navigateTo) => {
    navigation.navigate(navigateTo);
  };

  const onBannerPress = () => {
    navigation.navigate("RegistrationForVaccination");
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <MainBanner onBannerPress={onBannerPress} />
      <Menu
        onMenuItemPress={onMenuItemPress}
        setModalVisible={setModalVisible}
      />
      <MainCarousel onMenuItemPress={onMenuItemPress} />
      <ModalRecordsType
        modalVisible={modalVisible}
        closeModal={closeModal}
        onMenuItemPress={onMenuItemPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
  },
});
