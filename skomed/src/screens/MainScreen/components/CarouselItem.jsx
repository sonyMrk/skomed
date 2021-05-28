import React from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { AppBoldText } from "../../../components/ui/AppBoldText";
import { normalize } from "../../../utils/normalizeFontSize";

const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  "window"
);

export const CarouselItem = ({ item, index, onPress }) => {
  const handlePress = () => {
    onPress(item.navigateTo);
  };
  return (
    <View style={{ marginRight: 20 }}>
      <ImageBackground
        source={{
          uri: item.imageURI,
        }}
        style={styles.slider__image}
      >
        <TouchableOpacity onPress={handlePress}>
          <View style={styles.slide}>
            <AppBoldText style={styles.slide__text}>{item.title}</AppBoldText>
          </View>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  slider__image: {
    width: "100%",
    height: viewportHeight / 6,
    resizeMode: "cover",
    justifyContent: "center",
    borderRadius: 20,
    overflow: "hidden",
  },
  slide: {
    paddingHorizontal: viewportHeight / 40,
  },
  slide__text: {
    fontSize: normalize(14),
    maxWidth: 150,
    textShadowColor: "rgb(255, 255, 255)",
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 10,
  },
});
