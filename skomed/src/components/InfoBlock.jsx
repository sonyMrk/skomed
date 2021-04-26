import React from "react";
import { StyleSheet, View } from "react-native";

import { AppText } from "./ui/AppText";
import { THEME } from "../theme";
import { AppBoldText } from "./ui/AppBoldText";

const ProfileInfoItem = ({ title, value }) => {
  return (
    <View style={styles.item}>
      <View>
        <AppText style={{ color: THEME.GRAY_COLOR }}>{title}</AppText>
      </View>
      <View>
        <AppBoldText>{value}</AppBoldText>
      </View>
    </View>
  );
};

export const InfoBlock = ({ infoData, children }) => {
  return (
    <View style={styles.info}>
      {infoData.FIO && <ProfileInfoItem title="Ф.И.О" value={infoData.FIO} />}
      {infoData.Attachment && (
        <ProfileInfoItem
          title="Мед организация прикрепления"
          value={infoData.Attachment}
        />
      )}
      {infoData.AttachmentAddress && (
        <ProfileInfoItem title="Адрес" value={infoData.AttachmentAddress} />
      )}
      {infoData.Territory && (
        <ProfileInfoItem title="Участок" value={infoData.Territory} />
      )}
      {infoData.Doctor && (
        <ProfileInfoItem title="Участковый врач" value={infoData.Doctor} />
      )}
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
