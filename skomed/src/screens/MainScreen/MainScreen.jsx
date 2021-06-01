import React, { useRef, useState } from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import Carousel from "react-native-snap-carousel";
import { Asset } from "expo-asset";

import { MenuItem } from "./components/MenuItem";
import { AppText } from "../../components/ui/AppText";

import { AppBoldText } from "../../components/ui/AppBoldText";
import { normalize } from "../../utils/normalizeFontSize";
import { CarouselItem } from "./components/CarouselItem";
import { ModalRecordsType } from "./components/ModalRecordTypes";

const carouselItems = [
  {
    title: "Поиск лекарств в аптеках",
    imageURI: Asset.fromModule(
      require("../../../assets/images/search_farm.jpg")
    ).uri,
    navigateTo: "DrugSearchScreen",
  },
  {
    title: "Справочник медицинских организаций СКО",
    imageURI: Asset.fromModule(require("../../../assets/images/med_dir.jpg"))
      .uri,
    navigateTo: "HospitalDirectoryScreen",
  },
];

const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  "window"
);

const SLIDE_WIDTH = Math.round(viewportWidth / 1.7);
const ITEM_HORIZONTAL_MARGIN = 25;
const ITEM_WIDTH = SLIDE_WIDTH + ITEM_HORIZONTAL_MARGIN * 2;
const SLIDER_WIDTH = viewportWidth * 0.93;

export const MainScreen = ({ navigation }) => {
  const carouselRef = useRef(null);

  const [modalVisible, setModalVisible] = useState(false);

  const onMenuItemPress = (navigateTo) => {
    navigation.navigate(navigateTo);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.banner__wrapper}>
        <ImageBackground
          source={require("../../../assets/images/banner.jpg")}
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
                  <View
                    style={{ ...styles.action, backgroundColor: "#F1842B" }}
                  >
                    <AppText style={styles.action__text}>Быстро</AppText>
                  </View>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </ImageBackground>
      </View>
      <View style={styles.menu}>
        <MenuItem
          title="Запись на прием"
          key="1"
          onPress={() => setModalVisible(true)}
        >
          <Image
            source={require("../../../assets/icons/appointment.png")}
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
            source={require("../../../assets/icons/house_call.png")}
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
            source={require("../../../assets/icons/shedule.png")}
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
            source={require("../../../assets/icons/work_ev.png")}
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
            source={require("../../../assets/icons/doc_scan.png")}
            style={styles.icon}
          />
        </MenuItem>
      </View>

      <View style={styles.carousel}>
        <Carousel
          sliderWidth={SLIDER_WIDTH}
          itemWidth={ITEM_WIDTH}
          itemHeight={viewportHeight / 6}
          activeSlideAlignment={"start"}
          inactiveSlideScale={1}
          inactiveSlideOpacity={1}
          ref={carouselRef}
          data={carouselItems}
          renderItem={(props) => (
            <CarouselItem {...props} onPress={onMenuItemPress} />
          )}
          layout={"default"}
        />
      </View>
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
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  banner__wrapper: {
    flex: 1.5,
    resizeMode: "cover",
    justifyContent: "center",
  },
  banner: {
    width: viewportWidth,
    justifyContent: "flex-end",
  },
  info: {
    paddingLeft: 20,
    paddingBottom: 10,
  },
  icon: {
    width: Dimensions.get("screen").width / 15,
    height: Dimensions.get("screen").width / 15,
    resizeMode: "contain",
  },
  info__title: {
    fontSize: normalize(17),
    maxWidth: 200,
    textShadowColor: "rgb(255, 255, 255)",
    textShadowOffset: { width: 3, height: 3 },
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
  menu: {
    flex: 2.2,
    width: viewportWidth,
    marginTop: viewportHeight / 40,
  },
  carousel: {
    flex: 1.35,
    marginTop: 20,
    padding: 20,
  },
});
