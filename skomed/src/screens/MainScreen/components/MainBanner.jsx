import React from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { normalize } from "../../../utils/normalizeFontSize";
import { AppBoldText } from "./../../../components/ui/AppBoldText";
import { AppText } from "./../../../components/ui/AppText";

const { width: viewportWidth, height: viewportHeight } =
  Dimensions.get("window");

export const MainBanner = ({ onBannerPress }) => {
  return (
    <View style={styles.banner__wrapper}>
      <ImageBackground
        source={require("../../../../assets/images/banner.jpg")}
        style={styles.image}
      >
        <TouchableOpacity onPress={onBannerPress}>
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
    </View>
  );
};

const styles = StyleSheet.create({
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
});
