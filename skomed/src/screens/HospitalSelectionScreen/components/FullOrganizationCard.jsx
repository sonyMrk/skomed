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

const hospitalIcons = {
  867: Asset.fromModule(require("../../../../assets/images/3gp_icon.jpg")).uri,
  345: Asset.fromModule(require("../../../../assets/images/crb_ayrtau.jpg"))
    .uri,
  353: Asset.fromModule(require("../../../../assets/images/crb_musrepova.jpg"))
    .uri,
  350: Asset.fromModule(require("../../../../assets/images/crb_jumabaeva.jpg"))
    .uri,
  355: Asset.fromModule(require("../../../../assets/images/crb_jumabaeva.jpg"))
    .uri,
  356: Asset.fromModule(require("../../../../assets/images/crb_ualihan.jpg"))
    .uri,
  357: Asset.fromModule(require("../../../../assets/images/crb_shalakyn.jpg"))
    .uri,
  349: Asset.fromModule(require("../../../../assets/images/crb_jambyl.jpg"))
    .uri,
};

export const FullOrganizationCard = ({ appointmentUserData, onPress }) => {
  return (
    <TouchableOpacity activeOpacity={0.3} onPress={onPress}>
      <View style={styles.organization}>
        {appointmentUserData?.Attachment ? (
          <View style={styles.organization__header}>
            <View style={styles.orgHeader_left}>
              <AppText style={{ fontSize: normalize(12) }}>
                Ваша поликлиника прикрепления
              </AppText>
              <AppBoldText
                style={{ fontSize: normalize(15), marginBottom: 10 }}
              >
                {appointmentUserData?.Attachment}
              </AppBoldText>
              <AppText style={{ fontSize: normalize(13), marginBottom: 5 }}>
                {appointmentUserData?.AttachmentAddress}
              </AppText>
              {appointmentUserData?.AttachmentID === "867" ? (
                <AppText style={{ fontSize: normalize(13) }}>
                  Т.Мухамед-Рахимова 27 - " Центр семейного здоровья"
                </AppText>
              ) : null}
            </View>
            <View style={styles.orgHeader_right}>
              <Image
                source={{
                  uri: hospitalIcons[appointmentUserData.AttachmentID],
                }}
                style={styles.orgIcon}
              />
            </View>
          </View>
        ) : (
          <View style={styles.error__container}>
            <AppBoldText style={styles.error}>
              Поликлиника не найдена
            </AppBoldText>
          </View>
        )}
        <View style={styles.organization__middle}>
          <View style={{ ...styles.badge, ...styles.territory }}>
            <AppText style={{ color: "#fff", fontSize: normalize(11) }}>
              {appointmentUserData?.Territory
                ? appointmentUserData?.Territory
                : "Участок не найден"}
            </AppText>
          </View>
          <View
            style={{
              ...styles.badge,
              ...styles.osms,
              backgroundColor:
                appointmentUserData?.StatusOSMS === "Застрахован"
                  ? THEME.BLUE_COLOR
                  : THEME.DANGER_COLOR,
            }}
          >
            <AppText style={{ color: "#fff", fontSize: normalize(11) }}>
              {appointmentUserData?.StatusOSMS}
            </AppText>
          </View>
        </View>
        <View style={styles.organization__footer}>
          <View style={styles.doctor}>
            <AppText style={{ fontSize: normalize(13) }}>Врач: </AppText>
            <AppBoldText style={{ fontSize: normalize(13) }}>
              {appointmentUserData?.Doctor.trim()
                ? appointmentUserData?.Doctor
                : "Не найден"}
            </AppBoldText>
          </View>
          <Image
            source={require("../../../../assets/icons/arrow.png")}
            style={styles.arrow}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  organization: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: normalize(14),
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
    justifyContent: "space-between",
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
