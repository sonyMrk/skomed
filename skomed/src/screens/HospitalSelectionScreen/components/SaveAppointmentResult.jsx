import React from "react";
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { AppBoldText } from "../../../components/ui/AppBoldText";
import { AppText } from "../../../components/ui/AppText";
import { formatServerDate } from "../../../utils/formatDate";
import { normalize } from "../../../utils/normalizeFontSize";
import { THEME } from "../../../theme";

const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  "window"
);

export const SaveAppointmentResult = ({
  result,
  specialization,
  goToHistory,
}) => {
  if (result.ErrorCode !== 0) {
    return (
      <View style={styles.error__container}>
        <AppBoldText style={styles.error}>{result.ErrorDesc}</AppBoldText>
      </View>
    );
  }

  return (
    <View style={styles.result}>
      <View style={styles.result__check}>
        <Image
          source={require("../../../../assets/icons/check.png")}
          style={styles.result__icon}
        />
      </View>
      <View style={styles.header}>
        <AppBoldText style={styles.title}>Готово!</AppBoldText>
        <AppBoldText style={styles.title}>Ваш талон:</AppBoldText>
      </View>
      <TouchableOpacity
        style={styles.talon__body}
        activeOpacity={0.7}
        onPress={goToHistory}
      >
        <AppBoldText style={styles.talon__title}>{result.orgName}</AppBoldText>
        <View style={styles.talon__info}>
          <AppText style={styles.info__name}>Дата приема:</AppText>
          <AppBoldText>{formatServerDate(result.data)}</AppBoldText>
        </View>

        <View style={styles.talon__info}>
          <AppText style={styles.info__name}>Время приема:</AppText>
          <AppBoldText>{result.timeStart}</AppBoldText>
        </View>

        <View style={styles.talon__info}>
          <AppText style={styles.info__name}>Специальность:</AppText>
          <AppBoldText>{specialization}</AppBoldText>
        </View>

        <View style={styles.talon__info}>
          <AppText style={styles.info__name}>Врач:</AppText>
          <AppBoldText>{result.doctorName}</AppBoldText>
        </View>

        <View style={styles.talon__number}>
          <AppBoldText style={styles.number}>
            {result.ReceiptNumber}
          </AppBoldText>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  result: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
  },
  result__check: {
    width: viewportWidth / 5,
    height: viewportWidth / 5,
    borderRadius: viewportWidth / 10,
    backgroundColor: THEME.MAIN_COLOR,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: normalize(25),
  },
  result__icon: {
    resizeMode: "contain",
  },
  talon__body: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: normalize(15),
    marginTop: normalize(20),
  },
  talon__title: {
    textAlign: "center",
    fontSize: normalize(19),
    marginBottom: normalize(20),
  },
  talon__info: {
    flexDirection: "row",
  },
  talon__number: {
    marginTop: normalize(10),
  },
  number: {
    textAlign: "center",
    fontSize: normalize(50),
  },
  info__name: {
    marginRight: 5,
  },
  title: {
    textAlign: "center",
    fontSize: normalize(17),
  },

  error__container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  error: {
    color: THEME.DANGER_COLOR,
    fontSize: 18,
    textAlign: "center",
  },
});
