import React from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import { Asset } from "expo-asset";

import { AppText } from "../../../components/ui/AppText";
import { AppBoldText } from "../../../components/ui/AppBoldText";
import { normalize } from "../../../utils/normalizeFontSize";
import { THEME } from "../../../theme";

const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  "window"
);

const hospitalInfo = {
  45500000000000184: {
    icon: Asset.fromModule(
      require("../../../../assets/images/esil_diagnostic.png")
    ).uri,
    address: "Петропавловск, ул.​Тауфика Мухамед-Рахимова, 66",
  },
  335: {
    icon: Asset.fromModule(
      require("../../../../assets/images/oblastnaja-bolnica.jpg")
    ).uri,
    address: "Петропавловск, ул. Брусиловского 20, 150000Т",
  },
};

export const MinOrganizationCard = ({
  organization,
  onPress,
  active,
  index,
}) => {
  const handlePress = () => {
    onPress(organization.value, index);
  };

  return (
    <TouchableOpacity activeOpacity={0.3} onPress={handlePress}>
      <View
        style={{
          ...styles.organization,
          backgroundColor: active ? THEME.MAIN_COLOR : "#fff",
        }}
      >
        <View style={styles.organization__header}>
          <View style={styles.orgHeader_left}>
            <AppText
              style={{
                fontSize: normalize(12),
                color: active ? "#fff" : "#000",
              }}
            >
              Медицинская организация
            </AppText>
            <AppBoldText
              style={{
                fontSize: normalize(15),
                marginBottom: 10,
                color: active ? "#fff" : "#000",
              }}
            >
              {organization.label}
            </AppBoldText>
            <AppText
              style={{
                fontSize: normalize(13),
                marginBottom: 5,
                color: active ? "#fff" : "#000",
              }}
            >
              {hospitalInfo[organization.value.OrgID].address}
            </AppText>
          </View>
          <View style={styles.orgHeader_right}>
            <Image
              source={{
                uri: hospitalInfo[organization.value.OrgID].icon,
              }}
              style={styles.orgIcon}
            />
          </View>
        </View>
        <View style={styles.organization__footer}>
          <Image
            source={require("../../../../assets/icons/check.png")}
            style={styles.arrow}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  organization: {
    borderRadius: 10,
    padding: normalize(14),
    marginBottom: normalize(15),
  },
  organization__header: {
    flexDirection: "row",
  },
  organization__middle: {
    flexDirection: "row",
    marginVertical: normalize(20),
  },
  organization__footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  doctor: {
    flexDirection: "row",
    justifyContent: "center",
  },
  arrow: {
    resizeMode: "contain",
    width: viewportWidth / 20,
    height: viewportWidth / 20,
  },
  orgHeader_left: {
    flex: 4,
    paddingRight: 10,
  },
  orgHeader_right: {
    flex: 1,
    alignItems: "center",
  },
  orgIcon: {
    resizeMode: "contain",
    width: viewportWidth / 5,
    height: viewportWidth / 5,
    borderRadius: 10,
    overflow: "hidden",
  },
  badge: {
    borderRadius: 10,
    justifyContent: "center",
    padding: normalize(10),
  },
  territory: {
    marginRight: normalize(20),
    backgroundColor: THEME.GRAY_COLOR,
  },
  osms: {},
});
