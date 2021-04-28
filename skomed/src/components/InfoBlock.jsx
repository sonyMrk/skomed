import React from "react";
import { StyleSheet, View } from "react-native";

import { AppText } from "./ui/AppText";
import { THEME } from "../theme";
import { AppBoldText } from "./ui/AppBoldText";

const ProfileInfoItem = ({ title, value, color="#000" }) => {
  return (
    <View style={styles.item}>
      <View>
        <AppText style={{ color: THEME.GRAY_COLOR }}>{title}</AppText>
      </View>
      <View>
        <AppBoldText style={{ color: color }}>{value ? value : "Не найдено"}</AppBoldText>
      </View>
    </View>
  );
};

export const InfoBlock = ({ infoData, children }) => {
  return (
    <View style={styles.info}>
      <ProfileInfoItem title="Ф.И.О" value={infoData.FIO} />

      <ProfileInfoItem
        title="Мед организация прикрепления"
        value={infoData.Attachment}
      />
      <ProfileInfoItem title="Адрес" value={infoData.AttachmentAddress} />
      <ProfileInfoItem title="Участок" value={infoData.Territory} />
      <ProfileInfoItem title="Участковый врач" value={infoData.Doctor} />
      <ProfileInfoItem title="Статус ОСМС" value={infoData.StatusOSMS} color={infoData.StatusOSMS === "НЕ застрахован" ? THEME.DANGER_COLOR : "#33cc33"} />
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    width: "100%",
    borderColor: THEME.GRAY_COLOR,
    borderBottomWidth: 1,
    paddingVertical: 10,
  },
  info: {
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
});
