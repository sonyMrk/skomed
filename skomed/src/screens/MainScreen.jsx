import React, { useRef } from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Carousel from "react-native-snap-carousel";
import { Asset } from "expo-asset";

import { MenuItem } from "../components/MenuItem";
import { AppText } from "../components/ui/AppText";

import AppointmentIcon from "../../assets/icons/appointment.svg";
import HouseCallIcon from "../../assets/icons/house_call.svg";
import SheduleIcon from "../../assets/icons/shedule.svg";
import WorkEvaluationIcon from "../../assets/icons/work_ev.svg";
import DocumentScannedIcon from "../../assets/icons/doc_scan.svg";
import { AppBoldText } from "../components/ui/AppBoldText";

const carouselItems = [
  {
    title: "Поиск лекарств в аптеках",
    imageURI: Asset.fromModule(require("../../assets/images/search_farm.jpg"))
      .uri,
    navigateTo: "DrugSearchScreen",
  },
  {
    title: "Справочник медицинских организаций СКО",
    imageURI: Asset.fromModule(require("../../assets/images/med_dir.jpg")).uri,
    navigateTo: "HospitalDirectoryScreen",
  },
];

export const MainScreen = ({ navigation }) => {
  const carouselRef = useRef(null);

  const onMenuItemPress = (navigateTo) => {
    navigation.navigate(navigateTo);
  };

  const renderCarouselItem = ({ item, index }) => {
    return (
      <ImageBackground
        source={{
          uri: item.imageURI,
        }}
        style={styles.slider__image}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(item.navigateTo);
          }}
        >
          <View style={styles.slide}>
            <AppBoldText style={styles.slide__text}>{item.title}</AppBoldText>
          </View>
        </TouchableOpacity>
      </ImageBackground>
    );
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/images/banner.jpg")}
        style={styles.image}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("RegistrationForVaccination");
          }}
        >
          <View style={styles.banner}>
            <View style={styles.info}>
              <AppBoldText style={styles.info__title}>
                Запись на прививку от COVID19
              </AppBoldText>
              <View style={styles.actions}>
                <View
                  style={{
                    ...styles.action,
                    backgroundColor: "#F12B2B",
                    marginRight: 10,
                  }}
                >
                  <AppText style={styles.action__text}>Бесплатно</AppText>
                </View>
                <View style={{ ...styles.action, backgroundColor: "#F1842B" }}>
                  <AppText style={styles.action__text}>Быстро</AppText>
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </ImageBackground>
      <View style={styles.menu}>
        <MenuItem
          title="Запись на прием"
          key="1"
          onPress={onMenuItemPress}
          navigateTo="Appointment"
        >
          <AppointmentIcon
            width={Dimensions.get("screen").width / 13}
            height={Dimensions.get("screen").width / 13}
          />
        </MenuItem>

        <MenuItem
          title="Вызов врача на дом"
          key="2"
          onPress={onMenuItemPress}
          navigateTo="HouseCallScreen"
        >
          <HouseCallIcon
            width={Dimensions.get("screen").width / 13}
            height={Dimensions.get("screen").width / 13}
          />
        </MenuItem>

        <MenuItem
          title="График работы врачей"
          key="3"
          onPress={onMenuItemPress}
          navigateTo="ScheduleScreen"
        >
          <SheduleIcon
            width={Dimensions.get("screen").width / 13}
            height={Dimensions.get("screen").width / 13}
          />
        </MenuItem>

        <MenuItem
          title="Оценка работы врача"
          key="4"
          onPress={onMenuItemPress}
          navigateTo="WorkEvaluation"
        >
          <WorkEvaluationIcon
            width={Dimensions.get("screen").width / 13}
            height={Dimensions.get("screen").width / 13}
          />
        </MenuItem>

        <MenuItem
          title="Проверка документа"
          key="5"
          onPress={onMenuItemPress}
          navigateTo="DocumentScannedScreen"
        >
          <DocumentScannedIcon
            width={Dimensions.get("screen").width / 13}
            height={Dimensions.get("screen").width / 13}
          />
        </MenuItem>
      </View>

      <View style={styles.carousel}>
        <Carousel
          ref={carouselRef}
          data={carouselItems}
          renderItem={renderCarouselItem}
          sliderWidth={Dimensions.get("window").width}
          itemWidth={Dimensions.get("window").width * 0.8}
          layout={"default"}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  banner: {
    width: Dimensions.get("window").width,
    justifyContent: "flex-end",
    flex: 2,
  },
  info: {
    paddingLeft: 20,
    paddingBottom: 10,
  },
  info__title: {
    fontSize: 20,
    maxWidth: 200,
    textShadowColor: "#fff",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  actions: {
    flexDirection: "row",
    marginTop: 15,
  },
  action: {
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  action__text: {
    color: "#fff",
  },
  image: {
    flex: 2,
    resizeMode: "cover",
    justifyContent: "center",
    marginBottom: 20,
  },
  menu: {
    flex: 4,
    width: Dimensions.get("window").width,
  },
  carousel: {
    flex: 2,
  },
  slider__image: {
    width: Dimensions.get("window").width * 0.8,
    height: Dimensions.get("window").height / 6,
    resizeMode: "cover",
    justifyContent: "center",
    marginBottom: 20,
    borderRadius: 30,
    overflow: "hidden",
  },
  slide: {
    padding: 30,
  },
  slide__text: {
    fontSize: 20,
    maxWidth: 200,
    textShadowColor: "#fff",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
});
