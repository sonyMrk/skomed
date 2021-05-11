import React from "react";
import { StyleSheet, View } from "react-native";

import { THEME } from "../theme";
import { InfoItem } from "../components/ui/InfoItem";

export const InfoBlock = ({ infoData, children }) => {
  return (
    <View style={styles.info}>
      <InfoItem title="Ф.И.О" value={infoData.FIO} />
      <InfoItem title="Адрес" value={infoData.Address} />
      <InfoItem
        title="Мед организация прикрепления"
        value={infoData.Attachment}
      />
      <InfoItem title="Адрес учреждения" value={infoData.AttachmentAddress} />
      <InfoItem title="Участок" value={infoData.Territory} />
      <InfoItem title="Участковый врач" value={infoData.Doctor} />
      <InfoItem
        title="Статус ОСМС"
        value={infoData.StatusOSMS}
        color={
          infoData.StatusOSMS === "НЕ застрахован"
            ? THEME.DANGER_COLOR
            : "#1f7a1f"
        }
      />
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
