import React, { useRef } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import Carousel from "react-native-snap-carousel";
import { Asset } from "expo-asset";

import { CarouselItem } from "./CarouselItem";

const { width: viewportWidth, height: viewportHeight } =
  Dimensions.get("window");

const SLIDE_WIDTH = Math.round(viewportWidth / 1.7);
const ITEM_HORIZONTAL_MARGIN = 25;
const ITEM_WIDTH = SLIDE_WIDTH + ITEM_HORIZONTAL_MARGIN * 2;
const SLIDER_WIDTH = viewportWidth * 0.93;

const carouselItems = [
  {
    title: "Поиск лекарств в аптеках",
    imageURI: Asset.fromModule(
      require("../../../../assets/images/search_farm.jpg")
    ).uri,
    navigateTo: "DrugSearchScreen",
  },
  {
    title: "Справочник медицинских организаций СКО",
    imageURI: Asset.fromModule(require("../../../../assets/images/med_dir.jpg"))
      .uri,
    navigateTo: "HospitalDirectoryScreen",
  },
];

export const MainCarousel = ({ onMenuItemPress }) => {
  const carouselRef = useRef(null);

  return (
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
  );
};

const styles = StyleSheet.create({
  carousel: {
    flex: 1.35,
    marginTop: 20,
    padding: 20,
  },
});
